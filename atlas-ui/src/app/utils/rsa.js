define("utils", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    /*!
        \brief Convenience function to create a tuple
        \return a tuple containing a and b
    */
    function tuple(a, b) {
        return [a, b];
    }
    /*!
        \brief Convenience function to create a tuple with 3 elements
        \return a tuple containing a, b, and c
    */
    function triple(a, b, c) {
        return [a, b, c];
    }
    /*!
        \brief Creates a list of tuples, where each tuple is the pairing
               elements with the same index from two lists
    
        \return A list of tuples
    */
    function zip(as, bs) {
        var xs = [];
        for (var i = 0; i < as.length && i < bs.length; ++i) {
            xs.push(tuple(as[i], bs[i]));
        }
        return xs;
    }
    exports.zip = zip;
    /*!
        \brief Creates a list of tuples, where each tuple is the pairing
               elements with the same index from three lists
               
        \return A list of tuples
    */
    function zip3(as, bs, cs) {
        var xs = [];
        for (var i = 0; i < as.length && i < bs.length && i < cs.length; ++i) {
            xs.push(triple(as[i], bs[i], cs[i]));
        }
        return xs;
    }
    exports.zip3 = zip3;
});
define("maths", ["require", "exports", "utils"], function (require, exports, utils) {
    "use strict";
    exports.__esModule = true;
    /*!
        \brief Calculates the greatest common divisor of a and b
        \return gcd(a, b)
    */
    function gcd(a, b) {
        var x = a;
        var y = b;
        while (y != 0) {
            var r = x % y;
            x = y;
            y = r;
        }
        return x;
    }
    exports.gcd = gcd;
    /*!
        \brief Tests if a and b are relative prime
        \return True if gcd(a, b) == 1
    */
    function areRelativelyPrime(a, b) {
        return gcd(a, b) == 1;
    }
    exports.areRelativelyPrime = areRelativelyPrime;
    /*!
        \brief Tests if all numbers in the input array are pairwise relatively prime
        \return true if for all pairs in as, gcd(a, b) == 1
    */
    function arePairwiseRelativelyPrime(as) {
        return as.every(function (left, leftIndex) {
            return as.every(function (right, rightIndex) {
                // don't compare the same number
                if (leftIndex == rightIndex) {
                    return true;
                }
                return areRelativelyPrime(left, right);
            });
        });
    }
    exports.arePairwiseRelativelyPrime = arePairwiseRelativelyPrime;
    /*!
        \brief Calculates the modular inverse of a mod n
    
        \return A number s such that s*a mod n == 1
    */
    function modularInverse(a, n) {
        // from https://en.wikipedia.org/wiki/Extended_Euclidean_algorithm
        var _a, _b;
        var t = 0;
        var newT = 1;
        var r = n;
        var newR = a;
        while (newR != 0) {
            var quotient = Math.floor(r / newR);
            _a = [newT, t - quotient * newT], t = _a[0], newT = _a[1];
            _b = [newR, r - quotient * newR], r = _b[0], newR = _b[1];
        }
        if (r > 1) {
            throw Error(a + " mod " + n + " does not have an inverse.");
        }
        if (t < 0) {
            t += n;
        }
        return t;
    }
    exports.modularInverse = modularInverse;
    /*!
        \brief Solves the system of linear congruences using the Chinese Remainder Theorem
    
        \param ms pairwise relatively prime positive integers greater than 1
        \param as arbitray integers
        \return the number that provides a solution to the
                system of linear congruences
    
        \throws An exception if a modular inverse cannot be found. This should not
                happen if ms are actually pairwise relative prime positive integers
                greater than 1.
    */
    function chineseRemainderTheorem(as, ms) {
        var m = ms.reduce(function (previousValue, currentValue) {
            return previousValue * currentValue;
        }, 1);
        var Ms = ms.map(function (value) { return m / value; });
        var system = utils.zip(Ms, ms);
        var ys = system.map(function (value) {
            var a = value[0];
            var n = value[1];
            return modularInverse(a, n);
        });
        return fastModularExponentiation(utils.zip3(as, Ms, ys).reduce(function (previousValue, currentValue) {
            return previousValue + currentValue[0] * currentValue[1] * currentValue[2];
        }, 0), 1, m);
    }
    exports.chineseRemainderTheorem = chineseRemainderTheorem;
    /*!
        \brief calculates b^n mod m, where n can be large
    
        \param b the base of the exponentiation b^n
        \param n the exponent in b^n
        \param m the modulus
    
        \return The result of b^n mod m
    */
    function fastModularExponentiation(b, n, m) {
        var x = 1;
        var power = b % m;
        for (var i = 0; i < 32; ++i) {
            var bit = (n >> i) & 1;
            if (bit == 1) {
                x = (x * power) % m;
            }
            power = (power * power) % m;
        }
        return x;
    }
    exports.fastModularExponentiation = fastModularExponentiation;
});
define("rsa", ["require", "exports", "maths"], function (require, exports, maths) {
    "use strict";
    exports.__esModule = true;
    /*!
        \brief Creates a private key from p, q, and e
    
        \param p A prime number
        \param q A prime number
        \param e A positive integer that is relatively prime to (p-1)*(q-1)
    
        \return a PrivateKey object
    */
    function makePrivateKey(p, q, e) {
        var d = maths.modularInverse(e, (p - 1) * (q - 1));
        return {
            p: p,
            q: q,
            d: d,
            dp: d % (p - 1),
            dq: d % (q - 1),
            qinv: maths.modularInverse(q, p)
        };
    }
    exports.makePrivateKey = makePrivateKey;
    function makePublicKey(p, q, e) {
        return {
            n: p * q,
            e: e
        };
    }
    exports.makePublicKey = makePublicKey;
    /*!
        \brief Translates a message with ASCII characters a-z to padded numbers
    
        The letter a is mapped to 00, b is mapped to 01,..., z is mapped to 25
        Example: hello becomes 07 04 11 11 14 (but with no spaces)
    
        \param message A string of lowercase letters from a to z
    
        \return a translated string that has an even numbered length
    */
    function translateMessage(message) {
        var characters = message.split('');
        var translation = characters.reduce(function (previousValue, currentValue) {
            var c = currentValue.charCodeAt(0) - 'a'.charCodeAt(0);
            if (c < 10) {
                return previousValue + '0' + c;
            }
            return previousValue + c;
        }, '');
        return translation;
    }
    exports.translateMessage = translateMessage;
    /*!
        \brief Translates a string of numbers to ASCII characters
    
        This does the opposite of translateMessage(). The output of
        translateMessage will always be an even number, but this
        function does not expect translatedMessage to have an
        even numbered length. In the case that it doesn't, the digits
        in translatedMessage will be padded automatically.
    
        Example: 0704111114 becomes hello
    
        \param translatedMessage A string of numbers
    */
    function untranslateMessage(translatedMessage) {
        var message = "";
        while (translatedMessage.length) {
            var char = translatedMessage.substr(0, 2);
            translatedMessage = translatedMessage.slice(2);
            if (char.length != 2) {
                char = '0' + char;
            }
            message += String.fromCharCode(Number(char) + 'a'.charCodeAt(0));
        }
        return message;
    }
    exports.untranslateMessage = untranslateMessage;
    /*!
        \brief Calculates the number of digits in a block
    
        \param n A positive integer
    
        \return The number of digits in a block
    */
    function calculateBlockSize(n) {
        var blockSize = 0;
        var digits = 0;
        while (digits = 25 * Math.pow(10, blockSize) + digits, digits < n) {
            blockSize += 2;
        }
        return blockSize;
    }
    exports.calculateBlockSize = calculateBlockSize;
    /*!
        \brief Converts a plaintext message to an array of numbers called blocks
    
        The blocks this function returns can then be passed to encrypt() or decrypt().
    
        \param plaintext The plaintext message to convert into blocks
        \param n The public key n value
    
        \return An array of numbers, called blocks
    */
    function plaintextToBlocks(plaintext, n) {
        var translatedMessage = translateMessage(plaintext);
        var blockSize = calculateBlockSize(n);
        var blocks = [];
        while (translatedMessage.length) {
            var blockString = translatedMessage.substr(0, blockSize);
            translatedMessage = translatedMessage.slice(blockSize);
            // pad with Xs
            for (var i = 0; i < blockString.length % blockSize; i += 2) {
                blockString += 'x'.charCodeAt(0) - 'a'.charCodeAt(0);
            }
            blocks.push(Number(blockString));
        }
        return blocks;
    }
    exports.plaintextToBlocks = plaintextToBlocks;
    /*!
        Converts an array of numbers to a plaintext message
    
        This function is supposed to be used with decrypt(). That is,
        decrypt()'s output is this function's input.
    
        \param blocks The array of numbers
        \param n The public key n value
    
        \return The plaintext message represented by the blocks
    */
    function blocksToPlaintext(blocks, n) {
        var blockSize = calculateBlockSize(n);
        return blocks.map(function (value) {
            var blockString = value.toString();
            // Add in missing zeros
            var paddingAmount = blockSize - blockString.length;
            var padding = '';
            if (paddingAmount < 0) {
                paddingAmount = 0;
            }
            for (var i = 0; i < paddingAmount; i++) {
                padding += '0';
            }
            blockString = padding + blockString;
            return untranslateMessage(blockString);
        }).reduce(function (previousValue, value) {
            return previousValue + value;
        });
    }
    exports.blocksToPlaintext = blocksToPlaintext;
    /*!
        \brief Encrypts a plaintext message using the RSA block cipher algorithm
    
        This function is not secure, and it is prone to overflow. This is because
        this function does not have an integer representation for integers larger
        than what JavaScript allows. As a result, small n and e values must
        be used.
    
        \param message A plaintext message to encrypt
        \param n n=p*q, where p and q are prime numbers, and (p-1)(q-1)
                 are relatively prime to e
        \param e A positive integer that is relatively prime to (p-1)(q-1)
    
        \return An array of numbers representing the encrypted message
    */
    function encrypt(blocksToEncrypt, key) {
        return blocksToEncrypt.map(function (value) {
            return maths.fastModularExponentiation(value, key.e, key.n);
        });
    }
    exports.encrypt = encrypt;
    /*!
        \brief Decrypts an array of blocks encrypted with the RSA block cipher algorithm
    
        This function is not secure, and it is prone to overflow. This is because
        this function does not have an integer representation for integers larger
        than what JavaScript allows. As a result, small n and e values must
        be used.
    
        \param cipherBlocks An array of numbers obatained from the encrypt() function
        \param key The private key used to decrypt the message
    
        \return An array of numbers representing the plaintext message
    */
    function decrypt(blocks, key) {
        /*
            Implementation using the general Chinese Remainder algorithm:
            return blocks.map((value : number) => {
    
                let cp : number = maths.fastModularExponentiation(value, 1, key.p);
                let cq : number = maths.fastModularExponentiation(value, 1, key.q);
    
                let mp : number = maths.fastModularExponentiation(cp, key.dp, key.p);
                let mq : number = maths.fastModularExponentiation(cq, key.dq, key.q);
    
                return maths.chineseRemainderTheorem([mp, mq], [key.p, key.q]);
            });
        */
        // Chinese Remainder algorithm optimization from:
        // https://en.wikipedia.org/wiki/RSA_(cryptosystem)#Using_the_Chinese_remainder_algorithm
        return blocks.map(function (value) {
            var m1 = maths.fastModularExponentiation(value, key.dp, key.p);
            var m2 = maths.fastModularExponentiation(value, key.dq, key.q);
            var h = 0;
            if (m1 < m2) {
                h = (key.qinv * (m1 - m2 + key.p)) % key.p;
            }
            else {
                h = (key.qinv * (m1 - m2)) % key.p;
            }
            return m2 + h * key.q;
        });
    }
    exports.decrypt = decrypt;
});
//# sourceMappingURL=rsa.js.map