package com.mars.atlas.service;



/******************************************************************************
 *  Compilation:  javac RSA.java
 *  Execution:    java RSA N
 *
 *  Generate an N-bit public and private RSA key and use to encrypt
 *  and decrypt a random message.
 *
 *  % java RSA 50
 *  public  = 65537
 *  private = 553699199426609
 *  modulus = 825641896390631
 *  message   = 48194775244950
 *  encrpyted = 321340212160104
 *  decrypted = 48194775244950
 *
 *  Known bugs (not addressed for simplicity)
 *  -----------------------------------------
 *  - It could be the case that the message >= modulus. To avoid, use
 *    a do-while loop to generate key until modulus happen to be exactly N bits.
 *
 *  - It's possible that gcd(phi, publicKey) != 1 in which case
 *    the key generation fails. This will only happen if phi is a
 *    multiple of 65537. To avoid, use a do-while loop to generate
 *    keys until the gcd is 1.
 *
 ******************************************************************************/

import javax.crypto.Cipher;
import java.math.BigInteger;
import java.security.*;


public class RSA {

    public PublicKey pubKey;
    PrivateKey privateKey;

    // generate an N-bit (roughly) public and private key
    RSA() {

        try {
            KeyPair keyPair = buildKeyPair();
            pubKey = keyPair.getPublic();
            privateKey = keyPair.getPrivate();
            byte [] signed = encrypt("This is a secret message");
            System.out.println(new String(signed));
            byte[] verified = decrypt(signed);
            System.out.println(new String(verified));     // This is a secret message

        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public static KeyPair buildKeyPair() throws NoSuchAlgorithmException {
        final int keySize = 2048;
        SecureRandom secureRandomGenerator = SecureRandom.getInstance("SHA1PRNG");
        byte[] randomBytes = new byte[128];
        secureRandomGenerator.nextBytes(randomBytes);
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
        keyPairGenerator.initialize(keySize, secureRandomGenerator );
        return keyPairGenerator.genKeyPair();
    }

    public byte[] encrypt(String message) throws Exception {
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.ENCRYPT_MODE, privateKey);

        return cipher.doFinal(message.getBytes());
    }

    public byte[] decrypt(byte [] encrypted) throws Exception {
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.DECRYPT_MODE, pubKey);
        return cipher.doFinal(encrypted);
    }



   /* public static void main(String[] args) {
        int N = Integer.parseInt(args[0]);
        RSA key = new RSA(N);
        StdOut.println(key);

        // create random message, encrypt and decrypt
        BigInteger message = new BigInteger(N-1, random);

        //// create message by converting string to integer
        // String s = "test";
        // byte[] bytes = s.getBytes();
        // BigInteger message = new BigInteger(bytes);

        BigInteger encrypt = key.encrypt(message);
        BigInteger decrypt = key.decrypt(encrypt);
        StdOut.println("message   = " + message);
        StdOut.println("encrypted = " + encrypt);
        StdOut.println("decrypted = " + decrypt);
    }*/
}

