import dayjs from "dayjs";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import {
  Calendar,
  type ICalendarEventBase,
  type Mode,
} from "react-native-big-calendar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { events } from "../../lib/events";

export default function CalendarScreen() {
  const { height } = useWindowDimensions();
  const [mode, setMode] = React.useState<Mode>("schedule");
  const [additionalEvents, setAdditionalEvents] = React.useState<
    ICalendarEventBase[]
  >([]);

  const addEvent = React.useCallback(
    (start: Date) => {
      const title = "New Event";
      const end = dayjs(start).add(59, "minute").toDate();
      setAdditionalEvents([...additionalEvents, { start, end, title }]);
    },
    [additionalEvents]
  );

  const addLongEvent = React.useCallback(
    (start: Date) => {
      const title = "New Long Event";
      const end = dayjs(start).add(1, "hour").add(59, "minute").toDate();
      setAdditionalEvents([...additionalEvents, { start, end, title }]);
    },
    [additionalEvents]
  );

  const modes: { key: Mode; label: string }[] = [
    { key: "week", label: "Week" },
    { key: "day", label: "Day" },
    { key: "3days", label: "3 Days" },
    { key: "month", label: "Month" },
    { key: "schedule", label: "Schedule" },
  ];

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1 bg-white">
        <SafeAreaView className="flex-1">
          <View className="bg-white border-b border-gray-200 pb-4">
            <Text className="text-2xl font-bold px-5 pt-4 pb-2 text-gray-900">
              Calendar
            </Text>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className="flex-grow-0"
            >
              <View className="flex-row px-4 gap-3">
                {modes.map((modeItem) => (
                  <TouchableOpacity
                    key={modeItem.key}
                    onPress={() => setMode(modeItem.key)}
                    className={`px-5 py-3 rounded-full border ${
                      mode === modeItem.key
                        ? "bg-blue-500 border-blue-500"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <Text
                      className={`text-sm font-semibold ${
                        mode === modeItem.key ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {modeItem.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <Calendar
            height={height - 180}
            events={[...events, ...additionalEvents]}
            onLongPressCell={addLongEvent}
            onPressCell={addEvent}
            sortedMonthView={false}
            mode={mode}
            moreLabel="+{moreCount}"
            onPressMoreLabel={(moreEvents) => {
              console.log(moreEvents);
            }}
            itemSeparatorComponent={() => <View className="h-1 mb-5" />}
          />
        </SafeAreaView>
      </View>
    </GestureHandlerRootView>
  );
}
