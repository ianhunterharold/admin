import React from 'react';
import {
  Card,
  Button,
  Tag,
} from 'antd';

import './style.scss';

const {
  Meta,
} = Card;

export default class EventCard extends React.Component {

    renderPendingActions() {
        const {
            archiveEvent,
            approveEvent,
            deleteEvent,
        } = this.props;
        return [
                    <Button key="archive-button" ghost type="primary" icon="export" onClick={archiveEvent}>Archive</Button>, 
                    <Button key="delete-button" type="danger" icon="delete" onClick={deleteEvent}>Delete</Button>,
                    <Button key="approve-button" type="primary" icon="check" onClick={approveEvent}>Approve</Button>
                ]
    }

    renderLiveActions() {
        const {
            archiveEvent,
            deleteEvent,
        } = this.props;
        return [
                    <Button key="archive-button"ghost type="primary" icon="export" onClick={archiveEvent}>Archive</Button>, 
                    <Button key="delete-button" type="danger" icon="delete" onClick={deleteEvent}>Delete</Button>]
    }

    render() {
        const {
          townHall,
          pending,
        } = this.props;
        return (
            <Card 
                key={townHall.eventId}
                className="event-card"
                extra={(<Button icon="edit">Edit (coming soon)</Button>)}
                actions={pending ? this.renderPendingActions() : this.renderLiveActions()}
                title={`${townHall.displayName || townHall.Member} (${townHall.party}) ${townHall.state} ${townHall.district || ''}`}
            >
                <Meta
                    title={townHall.eventName || ''}
                    description={townHall.meetingType}
                />
                <p>{townHall.repeatingEvent ? `${townHall.repeatingEvent}` : `${townHall.dateString} at ${townHall.Time} ${townHall.timeZone}`}</p>
                <p>{townHall.Location || ''}</p>
                <p>{townHall.address}</p>
                <ul><h4>Meta data (not shown)</h4>
                    <li>Event id: {townHall.eventId}</li>
                    <li>Chamber: {townHall.chamber}</li>
                    <li>Entered by: {townHall.enteredBy}</li>
                    <Tag color={townHall.dateValid ? "#2db7f5" : "#f50" }>{townHall.dateValid ? 'Date Valid' : 'Date not valid' }</Tag>
                    <Tag color={townHall.lat ?  "#2db7f5" : "#f50"}>{townHall.lat ? 'has geocode' : 'needs geocode'}</Tag>
                </ul>
               
      </Card>)
    }

}