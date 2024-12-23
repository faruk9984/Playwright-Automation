Feature: Error Validations
  @Validations
  Scenario Outline: placing the order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
        | username       | password  |
        | rahulshetty    | learning  |
        | Hello@123.com  | Hello123  |
 