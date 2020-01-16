import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  DatePickerAndroid,
} from 'react-native';

import GodzillaButton from '../Shared/GodzillaButton';
import { setFilter, getRooms } from '../../actions/room';
import { goBack } from '../../actions/nav';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007B7F',
  },
  address: {
    color: '#E2E2E2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressInput: {
    color: '#E2E2E2',
    marginBottom: 40,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  datePickerButton: {
    flex: 1
  },
  datePickerText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#E2E2E2',
  }
});

class FilterModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: props.filter.address,
      startDate: props.filter.startDate,
      endDate: props.filter.endDate,
    }
  }

  onStartDateChange = async () => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        // date: new Date(2020, 4, 25)
        minDate: new Date(),
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        this.setState({startDate: `${day}-${month+1}-${year}`});
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  onEndDateChange = async () => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        // date: new Date(2020, 4, 25)
        minDate: new Date(),
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        this.setState({endDate: `${day}-${month+1}-${year}`});
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  onSearch() {
    // Step 1: Set filter setFilter()
    this.props.setFilter(this.state);

    // Step 2: Go back ExploreTab
    this.props.goBack();

    // Step 3: Get new list of rooms based on search criteria
    this.props.getRooms();
  }

  render() {

    return (
      <ScrollView style={styles.container} contentContainerStyle = {{ padding: 20 }} >
        <Text style = {styles.address}>WHERE TO?</Text>
        <TextInput
          style = {styles.addressInput}
          underlineColorAndroid = '#E2E2E2'
          value = {this.state.address}
          onChangeText = {address => this.setState({address})}
        />

        <View style = {styles.datePicker}>
          <TouchableOpacity
            style = {styles.datePickerButton}
            onPress = { () => this.onStartDateChange() }>
            <Text style = {styles.datePickerText}>{this.state.startDate || 'Start Date'}</Text>
          </TouchableOpacity>

          <Text style = {[styles.datePickerText, {flex: 1}]}>to</Text>

          <TouchableOpacity
            style = {styles.datePickerButton}
            onPress = { () => this.onEndDateChange() }>
            <Text style = {styles.datePickerText}>{this.state.endDate || 'End Date'}</Text>
          </TouchableOpacity>

        </View>

        <GodzillaButton
          onPress = { () => this.onSearch()}
          backgroundColor = '#2F868E'
          textColor = '#E2E2E2'
          label = 'Search'
        />

      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  filter: state.room.filter,
});

const mapDispatchToProps = dispatch => ({
  setFilter: (filter) => dispatch(setFilter(filter)),
  getRooms: () => dispatch(getRooms()),
  goBack: () => dispatch(goBack())
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);
