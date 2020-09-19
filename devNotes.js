/*
/activities     {Get, Post, Push, Delete, Patch}
/auth           {Post}
/expoPushTokens {Post}
/tests          {Get, Post, Push, Delete, Patch}
/users          {Get, Post, Push, Delete, Patch}
*/

/*Models*/
// db.activities
const activity = {
  _id: ObjectID(""),
  user: ObjectID(""),
  name: "",
  timestamp: datetime,
  //One million other fields from Strava
};

// db.tests
const test = {
  _id: ObjectID(""),
  user: ObjectID(""),
  activity: ObjectID(""),
  title: "",
  protocol: "",
  analysis: "",
  png: "",
  published_to_strava: false,
  timestamp: datetime,
  interpreted: {
    lt1: 0,
    lt2: 0,
  },
  readings: [
    {
      heart_rate: 0,
      lactate: 0,
      seconds_since_segment: 0,
      note: "",
      previous_segment: {
        distance: 0,
        duration: 0,
        pace: "",
      },
    },
  ],
  weather: {
    description: "",
    humidity: 0,
    icon: "",
    temp_real: 0,
    temp_feel: 0,
    wind_degrees: 0,
    wind_direction: "",
    wind_speed: 0,
  },
};

// db.users
const user = {
  _id: ObjectID(""),
  pub_id: "AABDBF",
  name: "",
  email: "",
  phone: "",
  has_verified_email: false,
  has_synced_google: false,
  has_synced_strava: false,
  password: "",
  picture: "",
  expoPushToken: "",
  emailVerificationToken: "",
  location: {
    is_sharing: false,
    last_known: { lat: 0, lon: 0, timestamp: datetime },
    shared_to: [ObjectID("")],
    shared_from: [ObjectID("")],
  },
  activities: [ObjectID("")],
  tests: [ObjectID("")],
  threads: [ObjectID("")],
};

const thread = {
  _id: ObjectID(""),
  title: "",
  created_at: datetime,
  creator: ObjectId,
  members: [ObjectID],
  messages: [
    {
      sender: ObjectId,
      content: "",
      images: [],
      timestamp: datetime,
      deleted_by: [ObjectID],
    },
  ],
};
