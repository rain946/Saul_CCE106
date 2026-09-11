# Student Portal

Run `npm start` for Expo Go or `npm run web` for the browser. In PowerShell, use `npm.cmd` if script execution is disabled.

## Navigation acceptance walkthrough

1. Open Home. Confirm the welcome message, BSIT summary, and CCE 106, PHYS101, and CAPSTONE 2 links.
2. Open each course. Confirm the correct course appears and the tab bar is covered by the root stack detail screen. Press Back to return to Home.
3. Select Profile, then View student details. Confirm Rainier G Saul and demo ID 2026001 appear. Back returns to Profile.
4. Select Settings, then Manage preferences. Turn Study tip off. Return to Home and confirm the tip is hidden. Restore defaults to show it again. Preferences last for the current app session.
5. Open `/course/invalid` and `/student/invalid`. Confirm a not-found message and working Return to portal action.
6. Open `/course/CCE106` or `/student/2026001` directly in a fresh browser tab. Confirm Back returns to Home or Profile when there is no app navigation history.
7. Check the three tabs and detail screens on a narrow phone viewport, including scrolling and the device back button.

## Implementation

- `app/_layout.tsx`: root Stack.
- `app/(tabs)/_layout.tsx`: Home, Profile, Settings tabs. The old Explore route redirects Home and is hidden from the tab bar.
- Home uses `Link` with course ID parameters.
- Profile uses `router.push` with a student ID parameter.
- Detail screens read `useLocalSearchParams` and validate against the available records.
- Back uses `router.canGoBack`, `router.back`, and a `router.replace` fallback.
- `constants/portal.ts`: student and course data. Student ID is a demo value; schedules and instructors are not supplied.

Reference reviewed before implementation: https://docs.expo.dev/versions/v54.0.0/sdk/router/
