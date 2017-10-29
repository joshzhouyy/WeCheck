import axios from 'axios';


export const selectEvent = (event) => ({
  type: "SELECT_EVENT",
  event
});


export const removeEvent = (eventId) => ({
  type: "REMOVE_EVENT",
  eventId
});

// Helper functions
export const getOngoingEvents = (userId) => {
  //TODO: use userId to get relavant events + replace api to getAllOnGoingEvent/{userID}
  return new Promise ((resolve, reject) => {
    axios.get('api/all_event', userId)
    .then((response) => {
      const status = response.status;
      const statusText = response.statusText;
      if (status === 200) {
        const data = response.data;
        if (data !== null) {
          // console.log(data)
          resolve(data);
        }
        else {
          console.log("Found none events\n");
          // reject([])
        }
      }
      else {
        console.log(statusText);
      }
    })
    .catch((err) => {
      console.log(err);
      throw error;
    });
  })
}

const getFinishedEvents = () => {

}

export const getMemberList = (eventId) => {
  // console.log(eventId)
  return new Promise ((resolve, reject) => {
    axios.get('api/event/eventMember/' + eventId)
      .then((response) => {
        // console.log(response)
        const status = response.status;
        const statusText = response.statusText;
        if (status === 200) {
          const data = response.data;
          if (data !== null) {
            resolve(data);
          }
          else {
            console.log("Found none members");
          }
        }
        else {
          console.log(statusText);
        }
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  })
}

export const getBillSum = (eventId) => {
  return new Promise ((resolve, reject) => {
    axios.get('api/event/' + eventId)
      .then((response) => {
        const status = response.status;
        const statusText = response.statusText;
        if (status === 200) {
          const data = response.data;
          if (data !== null) {
            resolve(data.totalAmount);
          }
          else {
            console.log("Data is null");
          }
        }
        else {
          console.log(statusText);
        }
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  });
}

// export 