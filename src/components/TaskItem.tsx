import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import { EditTaskProps, Task } from "./TasksList";
import trashIcon from "../assets/icons/trash/trash.png";
import penIcon from "../assets/icons/pen/pen.png";
import Icon from "react-native-vector-icons/Feather";

interface TaskItemProps {
  item: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (newTask: EditTaskProps) => void;
}

export function TaskItem({
  item,
  index,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskItemProps) {
  const [isTaskBeingEdited, setIsTaskBeingEdited] = useState(false);
  const [editTaskTitle, setEditTaskTitle] = useState(item.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsTaskBeingEdited(true);
  }

  function handleCancelEditing() {
    setEditTaskTitle(item.title);
    setIsTaskBeingEdited(false);
  }

  function handleSubmitEditing() {
    editTask({ taskId: item.id, taskNewTitle: editTaskTitle });
    setIsTaskBeingEdited(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isTaskBeingEdited) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isTaskBeingEdited]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          {/* <Text style={item.done ? styles.taskTextDone : styles.taskText}>
            {item.title}
          </Text> */}

          <TextInput
            value={editTaskTitle}
            onChangeText={setEditTaskTitle}
            editable={isTaskBeingEdited}
            onSubmitEditing={handleSubmitEditing}
            style={item.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isTaskBeingEdited ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Image source={penIcon} />
          </TouchableOpacity>
        )}
        <View style={styles.iconsDivider} />

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 24 }}
          onPress={() => removeTask(item.id)}
        >
          <Image
            source={trashIcon}
            style={{ opacity: isTaskBeingEdited ? 0.2 : 1 }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  iconsDivider: {
    width: 1,
    height: 24,
    color: "rgba(196, 196, 196, 0.24)",
  },
  iconsContainer: {
    flexDirection: "row",
  },
});
