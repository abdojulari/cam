// export const extractUserInfo = (response: any) => {
//     // Extracting the needed values
//     const { lastName, firstName, middleName, address1 } = response.fields;
//     // Prepare the address object
//     const address = {
//         careOf: "",
//         phone: "",
//         street: "",
//         city: "",
//         state: "",
//         postalCode: "",
//         email: ""
//     };
//     // Loop through address1 to fill in the address details
//     address1.forEach((item: any) => {
//         switch (item.fields.code.key) {
//             case "CARE/OF":
//                 address.careOf = item.fields.data;
//                 break;
//             case "PHONE":
//                 address.phone = item.fields.data;
//                 break;
//             case "STREET":
//                 address.street = item.fields.data;
//                 break;
//             case "CITY/STATE":
//                 address.city = item.fields.data.split(',')[0].trim(); // Extract city
//                 address.state = item.fields.data.split(',')[1]?.trim(); // Extract state
//                 break;
//             case "POSTALCODE":
//                 address.postalCode = item.fields.data;
//                 break;
//             case "EMAIL":
//                 address.email = item.fields.data;
//                 break;
//         }
//     });

//     return {
//         lastName,
//         firstName,
//         middleName,
//         address
//     };
// };
