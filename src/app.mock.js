const expressApp = (await import("express")).application;

// Methods not needed for tests
expressApp.listen = async (_, cb) => {
    cb();
};

jest.unstable_mockModule("@models/index.js", () => ({
    connectToDatabase: () => {},
}));

// Export the modified version of the app
export default (await import("./app.js")).default;
