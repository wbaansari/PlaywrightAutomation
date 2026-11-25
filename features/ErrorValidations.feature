Feature: Error Validations
  @Regression
  Scenario Outline: Placing the Order
    Given A Login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
        | username             | password   |
        | wbaansari@gmail.com  | Orandge@1  |
        | test@gmail.com       | Orandge@1  |