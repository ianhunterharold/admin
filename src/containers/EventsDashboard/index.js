import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import {
  List, Radio, Row,
} from 'antd';

import eventsStateBranch from '../../state/events';
import selectionStateBranch from '../../state/selections'

import EventList from '../../components/EventList';
import EventCard from '../../components/EventCard';

import { 
    FEDERAL_STATE_RADIO_BUTTONS, 
    LIVE_EVENTS_TAB,
    PENDING_EVENTS_TAB, 
    ARCHIVED_EVENTS_TAB 
} from '../../constants';

import './style.scss';
import LookupOldEvents from '../LookupOldEvents';
import FederalStateRadioSwitcher from '../../components/FederalStateRadioSwitcher';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class EventsDashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.onRadioChange = this.onRadioChange.bind(this);
    }

    componentDidMount() {
        const {
          requestEvents,
          pathForEvents,

        } = this.props;
        requestEvents(pathForEvents);

    }

    componentDidUpdate(prevProps) {
        const {          
            requestEvents,
            pathForEvents,
        } = this.props;
        if (prevProps.pathForEvents !== pathForEvents && pathForEvents) {
                requestEvents(pathForEvents);
        }
    }

    onRadioChange({target}) {
        const {
          changeRadioButton
        } = this.props;
        changeRadioButton(target.value)
    }

    render () {
        const {
            eventsForList,
            pendingOrLive,
            
        } = this.props;
        return (
            <React.Fragment>
                <Row
                    type="flex"
                    justify="center"
                >
                <FederalStateRadioSwitcher 
                    onRadioChange={this.onRadioChange}
                />
                </Row>
                {pendingOrLive === ARCHIVED_EVENTS_TAB ?
                <LookupOldEvents /> :
                <EventList  
                    pending={pendingOrLive === PENDING_EVENTS_TAB}
                    eventsForList={eventsForList}
                />}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    pendingOrLive: selectionStateBranch.selectors.getPendingOrLiveTab(state),
    eventsForList: eventsStateBranch.selectors.getAllEventsAsList(state),
    pathForEvents: selectionStateBranch.selectors.getEventsToShowUrl(state),
    pathForArchive: selectionStateBranch.selectors.getArchiveUrl(state),
    pathForPublishing: selectionStateBranch.selectors.getLiveEventUrl(state),
    userSubmissionPath: selectionStateBranch.selectors.getSubmissionUrl(state),
});

const mapDispatchToProps = dispatch => ({
    archiveEvent: (townHall, path, archivePath) => dispatch(eventsStateBranch.actions.archiveEvent(townHall, path, archivePath)),
    approveEvent: (townHall, path, livePath) => dispatch(eventsStateBranch.actions.approveEvent(townHall, path, livePath)),
    deleteEvent: (townHall, path) => dispatch(eventsStateBranch.actions.deleteEvent(townHall, path)),
    changeRadioButton: (value) => dispatch(selectionStateBranch.actions.changeFederalStateRadio(value)),
    requestEvents: (path) => dispatch(eventsStateBranch.actions.requestEvents(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsDashBoard);
