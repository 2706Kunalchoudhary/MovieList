import { ActivityIndicator, BackHandler, Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colorConstants } from '../../utils/constants'
import { CustomButton, CustomInput } from '../../customs'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { movieList } from '../../services/ApiRequests'
import { WebView } from 'react-native-webview';



const MovieList = () => {
    const [movieDetails, setMovieDetails] = useState([])
    const [searchText, setSearchText] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(5); 
    const [loadingMore, setLoadingMore] = useState(false);
    const [showWebView,setShowWebView] = useState(false)
    const [loader, setLoader] = useState(false)



    useEffect(() => {
        // Fetch the movie details
        getMovieDetails()

    }, []);

    useEffect(() => {
        // Update the filtered products based on the search text & visible products
        filterProducts();
    }, [searchText,visibleProducts]);




    //Function to get movie details


    const getMovieDetails = async () => {
        setLoader(true);
        try {
            let response = await movieList()
            if (response && response.status == 200) {
                setMovieDetails(response.data.results)
                setFilteredProducts(response.data.results.slice(0, visibleProducts))
                setLoader(false);
                // console.log("data******", movieDetails);
                console.log(filteredProducts,"fillllllllllllllll");
            }


        } catch (error) {
            setLoader(false);
        }
    }

    // Function to filter products based on search text

    const filterProducts = () => {
        const filtered = movieDetails.filter((movie) =>
            movie.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredProducts(filtered.slice(0, visibleProducts));
    };

    // Load more function

    const loadMore = () => {
        setLoadingMore(true);
        setTimeout(() => {
            setVisibleProducts((prevVisible) => prevVisible + 5);
            setLoadingMore(false);
          }, 1000);
    };

    // Handling WebView function

    const handleWebView = () => {
        setShowWebView(true)
      }

      
    //   Rendering item for flatlist

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity key={index} style={index%2===0?styles.container2:styles.container3} onPress={handleWebView}>
                <Text style={styles.text2}>{item.title}</Text>
                </TouchableOpacity>
        )
    }

    
    
    return (
        <>
        {showWebView===true ? <WebView source={{ uri: 'https://www.themoviedb.org/' }} style={{ flex: 1 }} />:
        <View style={styles.mainContainer}>
            
            <CustomInput style={styles.container1}
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
            />
            {/* <CustomButton style={styles.btn} onPress={filterProducts}/> */}
            <Text style={styles.text1}>Movies List</Text>
            {loader
            ?
            <ActivityIndicator size={50} color={colorConstants.white}
                style={{alignSelf:"center",marginTop:responsiveHeight(30)}}
                />
                :
            <FlatList
                data={filteredProducts}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                ListFooterComponent={
                    loadingMore ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="small" color={colorConstants.white} />
                        </View>
                    ) : (searchText===""?
                    <CustomButton style={styles.btn} onPress={loadMore} btnTxt="Load More"/>:null
                    )
                }
            />
}
        </View>
}
        </>
    )
}

export default MovieList

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colorConstants.black
    },
    container1: {
        marginTop: responsiveHeight(5)
    },
    text1: {
        width: responsiveWidth(90),
        color: colorConstants.white,
        fontSize: 16,
        fontWeight: "600",
        alignSelf: "center",
        marginTop: responsiveHeight(3)
    },
    container2: {
        width: responsiveWidth(90),
        height: responsiveHeight(30),
        backgroundColor: colorConstants.neon,
        alignSelf: "center",
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2),
        borderRadius: 50,
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    container3: {
        width: responsiveWidth(90),
        height: responsiveHeight(30),
        backgroundColor: "#E08939",
        alignSelf: "center",
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2),
        borderRadius: 50,
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    text2: {
        width: responsiveWidth(60),
        color: colorConstants.white,
        alignSelf: "center",
        fontSize: 24,
        textAlign: "center",
        fontWeight: "600"
    },
    btn: {
        marginTop: responsiveHeight(3),
        marginBottom:responsiveHeight(2)
    },
    loadingContainer: {
        alignItems: 'center',
        paddingVertical: 8,
    },
})