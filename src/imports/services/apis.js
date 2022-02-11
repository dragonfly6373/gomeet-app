const PATH_PREFIX = "/bigbluebutton/api";
const APIS = {
    create: {
        method: "GET",
        pathname: PATH_PREFIX + "/create",
        params: ["allowStartStopRecording", "attendeePW", "autoStartRecording", "meetingID", "moderatorPW", "name", "record", "voiceBridge", "welcome", "checksum"]
    },
    join: {
        method: "GET",
        pathname: PATH_PREFIX + "/join",
        params: ["fullname", "meetingId", "password", "redirect", "checksum"]
    },
    getMeetingInfo: {
        method: "GET",
        pathname: PATH_PREFIX + "/getMeetingInfo",
        params: ["meetingID", "password", "checksum"]
    },
    getMeetings: {
        method: "GET",
        pathname: PATH_PREFIX + "/getMeetings",
        params: ["checksum"]
    },
    signOut: {
        method: "GET",
        pathname: PATH_PREFIX + "/signOut"
    },
    endMeeting: {
        method: "GET",
        pathname: PATH_PREFIX + "/end",
        params: ["meetingID", "password", "checksum"]
    }
}

export default APIS;
