import React from 'react';
import {
  Form, Icon, Input, Button, Checkbox, Select,
} from 'antd';
import { map } from 'lodash';

import { statesAb } from '../../assets/data/states';
import './style.scss';
import { LEVEL_FEDERAL, LEVEL_STATE, CAMPAIGN_STATUS_OPTIONS } from '../../constants';

const { Option } = Select;

const children = map(statesAb, (value, key) => (<Option key={key}>{value}</Option>));

const stateChambers = [
  {
    value: 'upper',
    label: 'upper',
  },
  {
    value: 'lower',
    label: 'lower',
  },
  {
    value: 'statewide',
    label: 'Gov',
  },
  {
    value: 'citywide',
    label: 'Mayor',
  },
];

const federalChambers = [{
    value: 'upper',
    label: 'Senate',
  },
  {
    value: 'lower',
    label: 'House',
  },
  {
    value: 'nationwide',
    label: 'Pres',
  },
];

class AddPersonForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRoleSelectChange = this.handleRoleSelectChange.bind(this);
  }

  handleRoleSelectChange(value) {
    const mapping = {
      Rep: 'lower',
      Sen: 'upper',
      Gov: 'statewide',
      Mayor: 'citywide',
      Pres: 'nationwide',
    }
    this.props.form.setFieldsValue({
      chamber: mapping[value],
    });
  }

  handleSubmit(e) {
    const {
      saveRole,
      form,
      person,
      usState,
      currentKey,
    } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const role = {
          ...values,
          level: usState ? 'state' : values.level
        }
        saveRole(person, role, currentKey);
        form.resetFields();
      }
    });
  }

  render() {
    const {
      getFieldDecorator,
      getFieldValue,
    } = this.props.form;
    const {
      level,
      usState,
      roleLabel,
      formTitle,
      candidate,
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const noLabelFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit} {...formItemLayout} className="add-person-form" >
        <h1>{formTitle}</h1>

        <Form.Item label="Level (state or federal)">
          {getFieldDecorator('level', {
            initialValue: level || usState ? LEVEL_STATE : LEVEL_FEDERAL,
            rules: [{ required: true}],
          })(
            <Select>
                <Option value={LEVEL_FEDERAL}>{LEVEL_FEDERAL}</Option>
                <Option value={LEVEL_STATE}>{LEVEL_STATE}</Option>
            </Select>
          )}
        </Form.Item>        
        <Form.Item label={roleLabel}>
          {getFieldDecorator('role', {
            rules: [{ required: true, message: 'Please enter a role' }],
          })(
            <Select
              onChange={this.handleRoleSelectChange}
            >
                <Option value="Rep">Rep</Option>
                <Option value="Sen">Senator</Option>
                {getFieldValue('level') === LEVEL_STATE && <Option value="Gov">Gov</Option>}
                {getFieldValue('level') === LEVEL_STATE &&<Option value="Mayor">Mayor</Option>}
                {getFieldValue('level') === LEVEL_FEDERAL && <Option value="Pres">Pres</Option>}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Chamber">
          {getFieldDecorator('chamber', {
            rules: [{ required: true, message: 'Party' }],
          })(
            <Select>
              {getFieldValue('level') === LEVEL_FEDERAL ?
                  map(federalChambers, (item) => <Option value={item.value}>{item.label}</Option>) :
                  map(stateChambers, (item) => <Option value={item.value}>{item.label}</Option>)
              }
            </Select>
          )}
        </Form.Item>
        {(getFieldValue('chamber') === 'lower' || getFieldValue('level') === LEVEL_STATE) && 
        <Form.Item 
          {...noLabelFormItemLayout}
          hasFeedback 
          help={getFieldValue('level') === LEVEL_STATE ? "full district, ie HD-9" : "zero padded number, '09'"}
        >
          {getFieldDecorator('district', {
            rules: [{ required: false, message: 'need a name' }],
          })(
            <Input placeholder="District" />
          )}
        </Form.Item>}
        {candidate && <Form.Item label="Status">
          {getFieldDecorator('status')
          (<Select >
              {CAMPAIGN_STATUS_OPTIONS.map(option => {
                  return (
                      <Option 
                          value={option}
                      >
                          {option}
                      </Option>

                  )
              })}
          </Select>)}
          
          </Form.Item>}
        {candidate && <Form.Item label="Incumbent">
          {
            getFieldDecorator('incumbent', {
                valuePropName: 'checked',
                initialValue: false,

              })(
            <Checkbox />
          )}
        </Form.Item>}
        {candidate && <Form.Item label="Pledger">
          {
            getFieldDecorator('pledged', {
                valuePropName: 'checked',
                initialValue: false,
              })(
            <Checkbox />
          )}
        </Form.Item>}
        <Form.Item label="State">
          {getFieldDecorator('state', {
            initialValue: usState || ''
          })(
            <Select
              placeholder="Select a State"
            >
                {children}
            </Select>
          )}
        </Form.Item>
        <Form.Item  {...noLabelFormItemLayout}>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Save to database
          </Button>
        </Form.Item>
      </Form>
    );
  }
}


export default Form.create({
  name: 'add_person_form'
})(AddPersonForm);
