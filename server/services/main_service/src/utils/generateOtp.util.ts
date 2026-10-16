export const generateOtp = () => {
    const otp = (1000 + Math.floor(Math.random() * 9000)).toString();
    return otp;
}