import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
  Modal
} from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Icon,
  Left,
  Body,
  Right,
  Title,
  Card,
  Fab,
  Button,
  Textarea
} from "native-base";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { totalSize, width, height } from "react-native-dimension";
import CommonStyles, { colors, blueGradient } from "../styles/CommonStyles";

import { getName,
updateTodoList } from "../actions";

class HomeScreen extends Component {
  /// set data source of list to zero initially
  constructor() {
    super();
    this.state = {
      text: "",
      screenType: "Todo",
      editOpt: "",
      showModal: false,
      showTextModal: false,
      selType: null,
      icon: "ios-checkmark-circle",
      iconColor: "lightgreen",
      selItem: null,
      selItemId: null,
      todoText: '',
      todoList: [
        // {
        //   id: 0,
        //   todo: "To do opt",
        //   status: "todo"
        // },
        // {
        //   id: 1,
        //   todo: "To do opt",
        //   status: "todo"
        // },
        // {
        //   id: 3,
        //   todo: "To do opt",
        //   status: "done"
        // },
        // {
        //   id: 4,
        //   todo: "To do opt",
        //   status: "done"
        // },
        // {
        //   id: 5,
        //   todo: "To do opt",
        //   status: "done"
        // }
      ]
    };
  }

  componentDidMount() {
    const { todoStored } = this.props;

    this.props.getName({ text: "MotoApp" });
    this.setState({
      todoList: todoStored
    });
  }

  changeTodoStatus({ type, item }) {
    console.warn(item.id);
    
    let icon = "";
    let iconColor = "";
    let modalButtonText = "";
    switch (type) {
      case "delete":
        icon = "trash";
        iconColor = "red";
        modalButtonText = `Delete Todo (${item.todo})`;
        break;
      case "edit":
        icon = "ios-brush";
        iconColor = "blue";
        modalButtonText = `Edit Todo (${item.todo})`;
        break;
      case "done":
        icon = "ios-checkmark-circle";
        iconColor = "lightgreen";
        modalButtonText = `Set Todo (${item.todo}) as Done`;
        break;
      default:
        break;
    }

    this.setState({
      modalButtonText,
      showModal: true,
      icon,
      iconColor,
      selItem: item,
      selItemId: item.id,
      selType: type
    });
  }

  // Action to apply on each todo Item
  proceedToAction() {
    const { selItemId, selType, todoList, selItem } = this.state;
    let newTodo = [];
    
    // console.warn('selType');

    if(selType === 'delete' && selItemId !== null) {
      newTodo = todoList.filter(function (todo) {
        // console.warn(todo.id, selItemId);
        return todo.id != selItemId;
      });
      this.setState({
        todoList: [ ...newTodo ],
        showModal: false,
        editOpt: ''
      });
      this.props.updateTodoList({ todo: [ ...newTodo ] });
    } else if(selType === 'done' && selItemId !== null) {
      newTodo = todoList.filter(function (todo) {
        if(todo.id == selItemId) {
          todo.status = 'done';
        }
          return todo;
      });
      this.setState({
        todoList: [ ...newTodo ],
        showModal: false,
        editOpt: ''
      });
      this.props.updateTodoList({ todo: [ ...newTodo ] });
    } else if(selType === 'edit' && selItem !== null) {
      // Call TodoModal on edit action
      this.setState({
        showTextModal: true,
        showModal: false,
        todoText: selItem.todo,
        editOpt: ''
      });
    }

  }

  // Edit or Add new todo Item
  proceedToEdit() {
    const { selItemId, selType, selItem, todoList, todoText } = this.state;
    let newTodo = [];
    
    if(selType === 'edit' && selItem !== null) {
      // Filter and edit todo list item
      newTodo = todoList.filter(function (todo) {
        if(todo.id == selItemId) {
          todo.todo = todoText;
        }
          return todo;
      });
    } else if(selType === 'add') {
      // Create and push new data on add
      const newTodoData = {
        id: todoList.length + 1,
        todo: todoText,
        status: 'todo'
      }
      newTodo = [ ...this.state.todoList, newTodoData ]
    }
  
      this.setState({
        todoList: [ ...newTodo ],
        showTextModal: false
      });
      this.props.updateTodoList({ todo: [ ...newTodo ] });
  }

  // Enable or disable each todo,s action
  showOpt({ item }) {
    const { editOpt } = this.state;
    if (editOpt === item) {
      this.setState({ editOpt: "" });
    } else {
      this.setState({ editOpt: item });
    }
  }

  renderItem = ({ item }) => {
    const { screenType, editOpt } = this.state;
    if (item.status.toLowerCase() !== screenType.toLowerCase()) {
      return;
    }

    return (
      <Card
      style={{
        width: width(90),
        marginLeft: width(5),
      }}>
        <View
          style={{
            padding: width(2),
            flexDirection: "row"
          }}
        >
          <View style={styles.leftCol}>
            <Text>{item.todo}</Text>
          </View>
          <TouchableOpacity
            style={styles.rightCol}
            onPress={() => this.showOpt({ item: item.id })}
          >
            {editOpt === item.id ? (
              <Icon name="ios-close" style={{}} />
            ) : (
              <Icon name="ios-add" style={{}} />
            )}
          </TouchableOpacity>
        </View>

        {editOpt === item.id && (
          <View animation="flipInX" duration={300} style={styles.btns}>
            <Button
              iconLeft
              small
              danger
              style={styles.btn}
              onPress={() => this.changeTodoStatus({ type: "delete", item })}
            >
              <Icon name="trash" />
              <Text style={styles.btnText2}>Delete</Text>
            </Button>
            {item.status.toLowerCase() !== "done" && (
              <Button
                iconLeft
                small
                info
                style={styles.btn}
                onPress={() => this.changeTodoStatus({ type: "edit", item })}
              >
                <Icon name="ios-bookmark" />
                <Text style={styles.btnText2}>Edit</Text>
              </Button>
            )}
            {item.status.toLowerCase() !== "done" && (
              <Button
                iconLeft
                small
                success
                style={styles.btn}
                onPress={() => this.changeTodoStatus({ type: "done", item })}
              >
                <Icon name="ios-checkmark" />
                <Text style={styles.btnText2}>Done</Text>
              </Button>
            )}
          </View>
        )}
      </Card>
    );
  };

  renderList() {
    const { todoList, screenType } = this.state;
    let available = false;
    
    if(screenType.toLowerCase() === 'todo') {
      const Todos = todoList.filter((todo) => {
        return todo.status != 'done';
      });
      available = Todos.length > 0 ? true : false;
    } else if(screenType.toLowerCase() === 'done') {
      const doneTodos = todoList.filter((todo) => {
        return todo.status == 'done';
      });
      available = doneTodos.length > 0 ? true : false;
    }

    if(available) {
      return (
        <FlatList
          data={this.state.todoList}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
          initialNumToRender={10}
        />
      );
    } else {
      console.warn('Todos', 'not available');
      return (
      <View style={{ color: 'black'}}>
        <Text style={{ textAlign:'center'}}>No {screenType} added yet</Text>
      </View>
      );
    }
  }

  renderSelection(type) {
    const screenType = this.state.screenType;

    if (screenType === type) {
      return (
        <LinearGradient
          start={blueGradient.colorsStart}
          end={blueGradient.colorsEnd}
          colors={colors.gradient}
          start={[0, 1]}
          end={[1, 0]}
          style={styles.activeChildCircle}
        >
          <Text style={styles.activeBtnText}>{type}</Text>
        </LinearGradient>
      );
    } else {
      return (
        <View style={styles.childCircle}>
          <Text style={styles.btnText}>{type}</Text>
        </View>
      );
    }
  }

  render() {
    const { screenType, modalButtonText, iconColor, icon, selType } = this.state;
    return (
      <Container>
        <View style={styles.statusBar} />
        <LinearGradient colors={colors.gradient} start={[0, 1]} end={[1, 0]}>
          <Header style={{ backgroundColor: "rgba(0,0,0,0)" }} noShadow>
            <Left style={{ flex: 1 }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.props.navigation.navigate("LoginScreen")}
              >
                <Icon name="log-out" style={{ color: "white" }} />
              </TouchableOpacity>
            </Left>
            <Body
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Title style={{ textAlign: "center" }}> TODO APP </Title>
            </Body>
            <Right style={{ flex: 1 }}></Right>
          </Header>
        </LinearGradient>
        <ScrollView>
          <View style={{ ...CommonStyles.wrapperBox }}>
            <View style={styles.parentCircle}>
              <TouchableWithoutFeedback
                onPress={() => this.setState({ screenType: "Todo" })}
              >
                {this.renderSelection("Todo")}
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => this.setState({ screenType: "Done" })}
              >
                {this.renderSelection("Done")}
              </TouchableWithoutFeedback>
            </View>
            {this.renderList()}
          </View>
        </ScrollView>
        {/* Modal Prompt */}
        <Modal
          transparent
          animationType={"none"}
          visible={this.state.showModal}
          onRequestClose={() => null}
        >
          <View
            style={[
              styles.modalBackground,
              { backgroundColor: `rgba(0,0,0,0.4)` }
            ]}
          >
            <View style={styles.activityIndicatorWrapper}>
              <View>
                <Icon
                  name={icon}
                  style={{
                    fontSize: totalSize(3),
                    color: iconColor,
                    fontWeight: "bold",
                    textAlign: "center",
                    paddingLeft: totalSize(0.5),
                    marginRight: totalSize(1)
                  }}
                />
                <Text style={styles.text}>{modalButtonText}</Text>
              </View>
              <View
                style={{
                  width: "90%",
                  marginTop: height(2),
                  flexDirection: "row",
                  justifyContent: "space-around"
                }}
              >
                <Button
                  danger
                  style={styles.modalButton}
                  onPress={() =>
                    this.setState({
                      showModal: false,
                      selItemId: null,
                      selType: null
                    })
                  }
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </Button>
                <Button
                  success
                  style={styles.modalButton}
                  onPress={() => this.proceedToAction()}
                >
                  <Text style={styles.modalButtonText}>Yes</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>

        {/* Input Modal */}       
        <Modal
          transparent
          animationType={"none"}
          visible={this.state.showTextModal}
          onRequestClose={() => null}
        >
          <View
            style={[
              styles.modalBackground,
              { backgroundColor: `rgba(0,0,0,0.4)` }
            ]}
          >
            <View style={{ ...styles.activityIndicatorWrapper, height: height(50)}}>
              <View style={{ width: '90%' }}>
              <Textarea rowSpan={5} bordered placeholder="Enter Todo here"
              value={this.state.todoText}
              onChangeText={(text) => this.setState({ todoText: text })}
              style={{ width: '100%' }} />
              </View>
              <View
                style={{
                  width: "90%",
                  marginTop: height(2),
                  flexDirection: "row",
                  justifyContent: "space-around"
                }}
              >
                <Button
                  danger
                  style={styles.modalButton}
                  onPress={() =>
                    this.setState({
                      showTextModal: false,
                      selItemId: null,
                      selType: null
                    })
                  }
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </Button>
                <Button
                  success
                  style={styles.modalButton}
                  onPress={() => this.proceedToEdit()}
                >
                  <Text style={styles.modalButtonText}>{selType === 'add' ? 'Add' : 'Edit'}</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>

            <Fab
              direction="up"
              containerStyle={{}}
              style={{
                backgroundColor: "#5067FF",
                width: totalSize(8),
                height: totalSize(8)
              }}
              position="bottomRight"
              onPress={() => this.setState({
                showTextModal: true,
                showModal: false,
                todoText: "",
                selItemId: null,
                selType: 'add'
              })}
            >
              <Icon name="ios-add" style={{ fontSize: totalSize(2) }} />
            </Fab>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight
  },
  parentCircle: {
    marginTop: height(2),
    marginBottom: height(2),
    height: height(6),
    padding: width(1),
    marginLeft: width(3),
    marginRight: width(3),
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgb(229,229,229)",
    borderRadius: height(6) / 2
  },
  childCircle: {
    height: height(5),
    width: width(90) / 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: height(5) / 2,
    backgroundColor: "transparent"
  },
  activeChildCircle: {
    height: height(5),
    width: width(90) / 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: height(5) / 2,
    elevation: 8
  },
  btnText: {
    color: "rgb(150,150,150)",
    fontSize: totalSize(2)
  },
  activeBtnText: {
    color: "#FFFFFF",
    fontSize: totalSize(2)
  },
  rightCol: {
    width: "10%",
    alignItems: "flex-end",
    paddingTop: 5
  },
  leftCol: {
    width: "90%",
    justifyContent: "center"
  },
  btns: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 10
  },
  btnText2: {
    color: "#fff",
    paddingLeft: 10,
    paddingRight: 10
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  activityIndicatorWrapper: {
    backgroundColor: "white",
    height: height(25),
    width: width(80),
    flexDirection: "column",
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: height(2),
    paddingBottom: height(2)
  },
  modalButton: {
    width: width(30),
    justifyContent: "center",
    alignItems: "center"
  },
  modalButtonText: {
    textAlign: "center",
    width: "100%",
    color: "white"
  }
});

const mapStateToProps = state => {
  const { name, todoStored } = state.home;

  return { name,
    todoStored
  };
};

const mapActionCreators = {
  getName,
  updateTodoList
};
export default connect(mapStateToProps, mapActionCreators)(HomeScreen);
