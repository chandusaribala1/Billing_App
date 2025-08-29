package com.BillingApplication.Billings.config;
import java.util.Properties;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration; // Import Spring's interface
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
@Configuration
public class MailConfig {
    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587); 
        mailSender.setUsername("deebam0831@gmail.com");
        mailSender.setPassword("ldna apiw omvp wevh");
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");               
        props.put("mail.smtp.starttls.enable", "true");     
        props.put("mail.debug", "true");                    

        return mailSender;

}
}
