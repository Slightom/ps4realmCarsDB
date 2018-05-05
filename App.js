import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Picker,
  Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

const Realm = require('realm');
let result = null;
let data = [
  { name: 'Devin' },
  { name: 'Jackson' },
];

// Define your models and their properties
const CarSchema = {
  name: 'Car',
  properties: {
    id: { type: 'int', default: -1 },
    make: 'string',
    model: 'string',
    year: { type: 'int', default: 2000 },
    miles: { type: 'int', default: 0 },
    color: 'string'
  }
};


class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      realm: null,
      selectedMake: 'all',
      selectedYearFrom: '1998',
      selectedYearTo: '2015',
    };
  }
  componentWillMount() {
    // Realm.open({
    //   schema: [CarSchema],
    //   schemaVersion: 2,
    //   migration: (oldRealm, newRealm) => {
    //     // only apply this change if upgrading to schemaVersion 1
    //     if (oldRealm.schemaVersion < 1) {
    //       const oldObjects = oldRealm.objects('Car');
    //       const newObjects = newRealm.objects('Car');

    //       // loop through all objects and set the name property in the new schema
    //       for (let i = 0; i < oldObjects.length; i++) {
    //         newObjects[i].id = i;
    //       }
    //     }
    //   }
    // }).then(realm => {
    //   const fullName = realm.objects('Car')[0].model;
    // })
    // .catch(error => {
    //   console.log(error);
    // });

    Realm.open({ schema: [CarSchema], schemaVersion: 2 })
      .then(realm => {

        realm.write(() => {
          let allCars = realm.objects('Car');
          realm.delete(allCars); // Deletes all cars
        });

        this.setState({ realm });

      })
      .catch(error => {
        console.log(error);
      });


    Realm.open({ schema: [CarSchema], schemaVersion: 2 })
      .then(realm => {

        realm.write(() => {
          const myCar = realm.create('Car', {
            id: 0,
            make: 'Honda',
            model: 'Civic',
            year: 1999,
            miles: 1000,
            color: 'black'
          });
        });

        realm.write(() => {
          const myCar = realm.create('Car', {
            id: 1,
            make: 'Ford',
            model: 'Focus',
            year: 2001,
            miles: 2000,
            color: 'white'
          });
        });

        realm.write(() => {
          const myCar = realm.create('Car', {
            id: 2,
            make: 'Seat',
            model: 'Toledo',
            year: 2002,
            miles: 3000,
            color: 'silver'
          });
        });

        realm.write(() => {
          const myCar = realm.create('Car', {
            id: 3,
            make: 'Fiat',
            model: 'Siena',
            year: 1998,
            miles: 3500,
            color: 'red'
          });
        });

        realm.write(() => {
          const myCar = realm.create('Car', {
            id: 4,
            make: 'Toyota',
            model: 'Avensis',
            year: 2006,
            miles: 4500,
            color: 'blue'
          });
        });

        this.setState({ realm });

      })
      .catch(error => {
        console.log(error);
      });
  }

  carClicked(p1, id) {
    //Alert.alert("id" + id);
    result = this.state.realm.objects('Car').filtered('id == ' + id);
    this.props.navigation.navigate('Details');
  }

  updateSelectedMake(newValue) {
    this.setState({ selectedMake: newValue })
  }
  updateSelectedYearFrom(newValue) {
    this.setState({ selectedYearFrom: newValue })
  }
  updateSelectedYearTo(newValue) {
    this.setState({ selectedYearTo: newValue })
  }

  filter(){
    if(this.state.selectedMake != 'all' && this.state.realm){
      result = this.state.realm.objects('Car').filtered(
        'make = "'+this.state.selectedMake +'"'+ 
        " AND year >= " + this.state.selectedYearFrom +
      " AND year <= " + this.state.selectedYearTo);
    }
    else{
      if(this.state.realm){
        result = this.state.realm.objects('Car').filtered(
          "year >= " + this.state.selectedYearFrom +
        " AND year <= " + this.state.selectedYearTo);
      }
    }
    this.props.navigation.navigate('Filtered', {
      selectedMake: this.state.selectedMake,
      selectedYearFrom: this.state.selectedYearFrom,
      selectedYearTo: this.state.selectedYearTo,
    });
  }

  render() {
    const info = this.state.realm
      ? 'Number of cars in this Realm: ' + this.state.realm.objects('Car').length
      : 'Loading...';

    let cars = this.state.realm ? this.state.realm.objects('Car') : data;


    return (
      <View>
        <View style={{ flexDirection: 'row', }}>
          <Picker
            selectedValue={this.state.selectedMake}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => this.updateSelectedMake(itemValue)}>
            <Picker.Item label="Honda" value="Honda" />
            <Picker.Item label="Ford" value="Ford" />
            <Picker.Item label="Seat" value="Seat" />
            <Picker.Item label="Fiat" value="Fiat" />
            <Picker.Item label="all" value="all" />
          </Picker>
          <Picker
            selectedValue={this.state.selectedYearFrom}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => this.updateSelectedYearFrom(itemValue)}>
            <Picker.Item label="1998" value="1998" />
            <Picker.Item label="1999" value="1999" />
            <Picker.Item label="2000" value="2000" />
            <Picker.Item label="2001" value="2001" />
            <Picker.Item label="2002" value="2002" />
            <Picker.Item label="2003" value="2003" />
            <Picker.Item label="2004" value="2004" />
            <Picker.Item label="2005" value="2005" />
            <Picker.Item label="2006" value="2006" />
            <Picker.Item label="2007" value="2007" />
            <Picker.Item label="2008" value="2008" />
            <Picker.Item label="2009" value="2009" />
            <Picker.Item label="2010" value="2010" />
            <Picker.Item label="2011" value="2011" />
            <Picker.Item label="2012" value="2012" />
            <Picker.Item label="2013" value="2013" />
            <Picker.Item label="2014" value="2014" />
            <Picker.Item label="2015" value="2015" />
          </Picker>
          <Picker
            selectedValue={this.state.selectedYearTo}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => this.updateSelectedYearTo(itemValue)}>
            <Picker.Item label="1998" value="1998" />
            <Picker.Item label="1999" value="1999" />
            <Picker.Item label="2000" value="2000" />
            <Picker.Item label="2001" value="2001" />
            <Picker.Item label="2002" value="2002" />
            <Picker.Item label="2003" value="2003" />
            <Picker.Item label="2004" value="2004" />
            <Picker.Item label="2005" value="2005" />
            <Picker.Item label="2006" value="2006" />
            <Picker.Item label="2007" value="2007" />
            <Picker.Item label="2008" value="2008" />
            <Picker.Item label="2009" value="2009" />
            <Picker.Item label="2010" value="2010" />
            <Picker.Item label="2011" value="2011" />
            <Picker.Item label="2012" value="2012" />
            <Picker.Item label="2013" value="2013" />
            <Picker.Item label="2014" value="2014" />
            <Picker.Item label="2015" value="2015" />
          </Picker>
          <Button
            onPress={() => this.filter(this)}
            title="filter"
            color="#841584"
          />
        </View>
        <Text>{info}</Text>
        <FlatList
          data={cars}
          renderItem={({ item }) =>
            <View >
              <TouchableOpacity onPress={() => this.carClicked(this, item.id)}>
                <View style={{ backgroundColor: item.id % 2 == 0 ? 'powderblue' : 'skyblue', alignItems: 'center' }}>
                  <Text style={styles.item}>{item.make} {item.model}, {item.year}</Text>
                </View>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    );
  }
}

class FilteredScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  carClicked(p1, id) {
    result = result.filtered('id == ' + id);
    this.props.navigation.navigate('Details');
  }

  render() {
    const info = result
      ? 'Number of cars in this Realm: ' + result.length
      : 'No results';

    let cars = result ? result : data;


    return (
      <View>
        <Text>{info}</Text>
        <FlatList
          data={cars}
          renderItem={({ item }) =>
            <View >
              <TouchableOpacity onPress={() => this.carClicked(this, item.id)}>
                <View style={{ backgroundColor: item.id % 2 == 0 ? 'powderblue' : 'skyblue', alignItems: 'center' }}>
                  <Text style={styles.item}>{item.make} {item.model}, {item.year}</Text>
                </View>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    );
  }

}

class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { realm: null };
  }

  render() {
    const info = result
      ? 'Number of cars in this Realm: ' + result.length
      : 'Loading...';



    let car = result ? result : data;

    return (
      <View>
        <Text>{info}</Text>
        <FlatList
          data={car}
          renderItem={({ item }) =>
            <View >
              <TouchableOpacity>
                <View style={{ backgroundColor: item.id % 2 == 0 ? 'powderblue' : 'skyblue', alignItems: 'center' }}>
                  <Text style={styles.item2}>
                    Make: {item.make}{"\n"}
                    Model: {item.model}{"\n"}
                    Year: {item.year}{"\n"}
                    Miles: {item.miles}{"\n"}
                    Color: {item.color}{"\n"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          }
        />
        <View >

        </View>
      </View>
    );
  }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
    Filtered: {
      screen: FilteredScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  item: {
    padding: 20,
    fontSize: 28,
    height: 120,
  },
  item2: {
    padding: 20,
    fontSize: 28,
    height: 520,
  },
  headerBelt: {
    height: 25,
    backgroundColor: 'green',
  },
});
