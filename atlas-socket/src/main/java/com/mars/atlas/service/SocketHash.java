package com.mars.atlas.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.UUID;

@Service
public class SocketHash extends HashMap<UUID, RSA> {
}
