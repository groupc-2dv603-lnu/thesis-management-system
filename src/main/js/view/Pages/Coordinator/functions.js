import * as Mock from './Mocks';


export function capitalizeFirstLetter(string) {
  if(string == null)
      return "N/A";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//TODO unfinished/mocks
export function checkDeadline(date) {
  return date === null ? "Not set" : date;
}

export function getIRData() {
  return new Mock.InitialReportMock();
}

export function getName(userId) {
  const users = new Mock.UsersMock()
  const user = users.entity._embedded.users.find(u => u.id === userId)
  return user.name
}

export function getbidderNames(bidders) {
  const bidderNames = []
   bidders.forEach(bidder => {
    bidderNames.push(getName(bidder))
  })

  console.log(bidderNames)
  return bidderNames
}