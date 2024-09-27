import React from "react";
import { Animated, StyleSheet } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

interface SwipeToDeleteWrapperProps {
  children: React.ReactNode;
  onDelete: () => void;
}

export const SwipeToDeleteTaskItem: React.FC<SwipeToDeleteWrapperProps> = ({
  children,
  onDelete,
}) => {
  const translateX = new Animated.Value(0);
  const gestureHandler = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const handleGestureEnd = (event: PanGestureHandlerGestureEvent) => {
    if (event.nativeEvent.translationX < -200) {
      Animated.timing(translateX, {
        toValue: -500,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        onDelete();
      });
    } else {
      // Reset the position if not swiped far enough
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={gestureHandler}
      onHandlerStateChange={handleGestureEnd}
    >
      <Animated.View
        style={[styles.container, { transform: [{ translateX }] }]}
      >
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
});
