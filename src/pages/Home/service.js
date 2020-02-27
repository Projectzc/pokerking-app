
export const  demo = async () => {
    try {
        let response = await fetch(
            'https://facebook.github.io/react-native/movies.json',
        );
        let responseJson = await response.json();
        console.log('数据',responseJson)
        return responseJson;
    } catch (error) {
        console.error(error);
    }
};
