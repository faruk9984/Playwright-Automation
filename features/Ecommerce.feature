Feature: Ecommerce Validations
  @Regression
  Scenario: placing the order
    Given a login to Ecommerce application with "test@yopmail.com" and "Faruk@123#"
    When Add "ZARA COAT 3" to cart
    Then Verify "ZARA COAT 3" is displayed in the cart
    When enter valid details and place the order
    Then Verify the order in present in the Orderhistory
    # Given a login to Ecommerce application with "test1@yopmail.com" and "Faruk12345"