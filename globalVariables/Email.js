let email = "";

module.exports = {
    setEmail: (newEmail) => {
        email = newEmail;
    },
    getEmail: () => {
        return email;
    }
};