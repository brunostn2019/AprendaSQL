package com.sqlpt.sqlptbr;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})

public class SqlptbrApplication {

    public static void main(String[] args) {
        SpringApplication.run(SqlptbrApplication.class, args);
    }

}
