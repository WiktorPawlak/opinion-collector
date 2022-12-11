package pl.io.opinioncollector.domain.dto;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.util.regex.Pattern;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString

public class RegistrationDto {
    public String email;
    public String login;
    public String hashedPass;

    public boolean validateUsername(String login){
        boolean correctLoging = true;
        if(login.length() >= 3 && login.length() <= 40){
            for(int i = 0; i< login.length(); i++)
                 if(Character.isWhitespace(login.charAt(i))){
                     correctLoging = false;
                 }
        }
        return correctLoging;
    }

//    public boolean validatePassword(String password){
//        boolean correctPassword = false;
//        boolean whitespace = false;
//        boolean specialCounter = false;
//        boolean correctLength = password.length() >= 8 && password.length() <= 32;
//        for(int i = 0; i< password.length(); i++){
//            char l = password.charAt(i);
//            if(!Character.isWhitespace(l)) {
//                whitespace = true;}
//            if (l == '$' || l == '#' || l == '?' || l == '!' || l == '_' || l == '=' || l == '%') {
//                specialCounter = true;}
//            }
//        if(!whitespace && specialCounter && correctLength){
//            correctPassword = true;
//        }
//        return correctPassword;
//    }


    public static boolean validateEmail(String emailAddress) {
        String regexPattern = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
            + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
        return Pattern.compile(regexPattern)
            .matcher(emailAddress)
            .matches();
    }

}
