import React from 'react';

import { Button, Modal, Form, Select } from 'antd';
import { CAMPAIGN_STATUS_OPTIONS } from '../../constants';
const { Option } = Select;

export default (props) => {
    const { modalRecord, modalVisible, handleModalOk, handleModalCancel, changeCampaignStatus } = props;
    const campaigns = modalRecord.campaigns || [];
    return (
        <Modal
            title={modalRecord.displayName + ' | ' + modalRecord.title}
            visible={modalVisible}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
            width={600}
            footer={[
                <Button key="submit" type="primary" onClick={handleModalOk}>
                    OK
            </Button>,
            ]}
        >
            <h2>Campaigns</h2>
            {campaigns.map((campaign, index) => {
                return (
                    <table>
                        <tbody>
                            <tr>
                                <th>Chamber</th>
                                <td>{campaign.chamber}</td>
                            </tr>
                            <tr>
                                <th>State</th>
                                <td>{campaign.state}</td>
                            </tr>
                            <tr>
                                <th>District</th>
                                <td>{campaign.district}</td>
                            </tr>
                            <tr>
                                <th>Incumbent</th>
                                <td>{campaign.incumbent ? 'Yes' : 'No'}</td>
                            </tr>
                            <tr>
                                <th>Pledged</th>
                                <td>{campaign.pledged ? 'Yes' : 'No'}</td>
                            </tr>
                            <tr>
                                <Form.Item label="Status">
                                    <Select 
                                        defaultValue={campaign.status}
                                        onChange={(value) => changeCampaignStatus(value, index, modalRecord)}
                                    >
                                            {CAMPAIGN_STATUS_OPTIONS.map(option => {
                                                return (
                                                    <Option 
                                                        value={option}
                                                    >
                                                        {option}
                                                    </Option>

                                                )
                                            })}
                                        </Select>
                                </Form.Item>  
                            </tr>
                        </tbody>
                    </table>
                )
            })}
           
        </Modal>
    )
}