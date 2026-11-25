Feature: Ecommerce Validations

  @Regression
  Scenario: Placing the Order
    Given A Login to Ecommerce application with "wbaansari@gmail.com" and "Orange@1"
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is displayed in the Cart
    When Enter valid details and place the Order
    Then Verify Order is present in the Order History

  # @Regression
  # Scenario Outline: Placing the Order
  #   Given A Login to Ecommerce2 application with "<username>" and "<password>"
  #   Then Verify Error message is displayed

  #   Examples:
  #       | username             | password   |
  #       | wbaansari@gmail.com  | Orandge@1  |
  #       | test@gmail.com       | Orandge@1  |