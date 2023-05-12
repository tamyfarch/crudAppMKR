import { Stack } from 'expo-router';

export default function layout() {
    return (
        <Stack
            initialRouteName="home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#D6DBB2",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }}
        >
            <Stack.Screen name="details" options={{}} />
        </Stack>
    )
}