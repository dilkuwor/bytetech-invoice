package cloud.bytetech.invoice.api.util;

import java.security.SecureRandom;

public class PasswordHelper {

    private static final String LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    private static final String DIGITS = "0123456789";
    private static final String ALL = LETTERS + DIGITS;
    private static final SecureRandom RANDOM = new SecureRandom();

    private PasswordHelper() {
        // utility class, prevent instantiation
    }

    public static String generate(int length) {
        if (length < 2) {
            throw new IllegalArgumentException("Password length must be at least 2");
        }

        StringBuilder sb = new StringBuilder(length);

        // ensure at least 1 letter
        sb.append(LETTERS.charAt(RANDOM.nextInt(LETTERS.length())));
        // ensure at least 1 digit
        sb.append(DIGITS.charAt(RANDOM.nextInt(DIGITS.length())));

        // fill remaining with random chars
        for (int i = 2; i < length; i++) {
            sb.append(ALL.charAt(RANDOM.nextInt(ALL.length())));
        }

        // shuffle to avoid predictable positions
        return shuffle(sb.toString());
    }

    private static String shuffle(String input) {
        char[] a = input.toCharArray();
        for (int i = a.length - 1; i > 0; i--) {
            int j = RANDOM.nextInt(i + 1);
            char tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        return new String(a);
    }
}