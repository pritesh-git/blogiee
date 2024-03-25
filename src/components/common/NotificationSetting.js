import React from 'react'
import { Form, ListGroup } from 'react-bootstrap'

const NotificationSetting = () => {
  return (
    <div>
      <Form className="p-4 m-5 rounded-lg shadow-lg">
        <Form.Label className="d-block mb-0">Security Alerts</Form.Label>
        <Form.Text className="text-mute mt-0 mb-2">
          Receive Security alert notification via email
        </Form.Text>
        <Form.Check
          type="switch"
          checked
          id="custom-switch1"
          label="Email each time a vulnerability is found"
        />
        <Form.Check
          type="switch"
          checked
          id="custom-switch2"
          label="Email a digest summary of vulnerability"
        />
        <Form.Label className="d-block mt-4">SMS Notifications</Form.Label>
        <ListGroup>
          <ListGroup.Item>
            <Form.Check type="switch" checked id="comment" label="Comments" />
          </ListGroup.Item>
          <ListGroup.Item>
            <Form.Check
              type="switch"
              checked
              id="updates"
              label="Updates From People"
            />
          </ListGroup.Item>
          <ListGroup.Item>
            <Form.Check
              type="switch"
              checked
              id="reminders"
              label="Remainders"
            />
          </ListGroup.Item>
          <ListGroup.Item>
            <Form.Check type="switch" checked id="events" label="Events" />
          </ListGroup.Item>
          <ListGroup.Item>
            <Form.Check
              type="switch"
              checked
              id="pages"
              label="Pages you Follow"
            />
          </ListGroup.Item>
        </ListGroup>
      </Form>
    </div>
  )
}

export default NotificationSetting
