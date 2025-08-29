package com.BillingApplication.Billings.service.payment;
import java.util.Base64;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
public class ChecksumGenerator {
    
    public static String generateChecksum(String data, String merchantKey) throws Exception {
        Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKey = new SecretKeySpec(merchantKey.getBytes(), "HmacSHA256");
        sha256_HMAC.init(secretKey);
        byte[] hash = sha256_HMAC.doFinal(data.getBytes());
        return Base64.getEncoder().encodeToString(hash);
    }

    public static boolean verifyChecksum(String data, String checksum, String merchantKey) throws Exception {
        String generated = generateChecksum(data, merchantKey);
        return generated.equals(checksum);
    }

}
