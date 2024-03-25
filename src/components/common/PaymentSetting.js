import React from 'react'
import { Form, Button } from 'react-bootstrap'

const PaymentSetting = () => {
  return (
    <div>
      <Form className="p-4 m-5 rounded-lg shadow-lg">
        <Form.Label className="d-block mb-0">Payment Method</Form.Label>
        <Form.Text className="text-muted mt-0 mb-2">
          You have not added any payment method
        </Form.Text>
        <Button
          variant="outline-info"
          type="button"
          onClick={() => {
            alert('this Feature is non functional at the moment')
          }}>
          Add Payment Method
        </Button>
        <Form.Label className="d-block mt-3">Payment History</Form.Label>
        <Form.Text className="text-muted text-center border p-3">
          You have not made any payment.
        </Form.Text>
      </Form>
    </div>
  )
}

export default PaymentSetting
