package project.model.enums;

public enum Grade {
    PASS("Pass"),
    FAIL("Fail");

    public final String label;

    Grade(String label) {
        this.label = label;
    }
}
