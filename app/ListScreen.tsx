import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  RefreshControl,
  Animated,
  ListRenderItem,
  Image,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface FoodItem {
  id: string;
  name: string;
  category: string;
  price: string;
  likes: number;
  image: string;
}

const initialData: FoodItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    category: 'Pizza',
    price: '$12.99',
    likes: 120,
    image:
      'https://images.unsplash.com/photo-1564936281291-294551497d81?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TWFyZ2hlcml0YSUyMFBpenphfGVufDB8fDB8fHww',
  },
  {
    id: '2',
    name: 'Cheeseburger',
    category: 'Burger',
    price: '$8.99',
    likes: 95,
    image:
      'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2hlZXNlYnVyZ2VyfGVufDB8fDB8fHww',
  },
  {
    id: '3',
    name: 'Caesar Salad',
    category: 'Salad',
    price: '$7.49',
    likes: 80,
    image:
      'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fENhZXNhciUyMFNhbGFkfGVufDB8fDB8fHww',
  },
  {
    id: '4',
    name: 'Sushi Rolls',
    category: 'Japanese',
    price: '$14.99',
    likes: 150,
    image:
      'https://plus.unsplash.com/premium_photo-1712949154611-6fd79879f884?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8U3VzaGklMjBSb2xsc3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '5',
    name: 'Pasta Alfredo',
    category: 'Pasta',
    price: '$11.99',
    likes: 110,
    image:
      'https://images.unsplash.com/photo-1542108339-4d5af99020f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8UGFzdGElMjBBbGZyZWRvfGVufDB8fDB8fHww',
  },
];

const FoodListScreen: React.FC = () => {
  const [data, setData] = useState<FoodItem[]>(initialData);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleDelete = (id: string) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setData([...initialData]);
      setRefreshing(false);
    }, 1500);
  };

  const renderItem: ListRenderItem<FoodItem> = ({ item }) => {
    const renderRightActions = (
      progress: Animated.AnimatedInterpolation<number>,
      dragX: Animated.AnimatedInterpolation<number>
    ) => {
      const scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });

      return (
        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          style={styles.deleteButton}>
          <Animated.View>
            <MaterialIcons name="delete" size={24} color="white" />
          </Animated.View>
        </TouchableOpacity>
      );
    };

    return (
      <Swipeable
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX)
        }>
        <View style={styles.item}>
          <Image source={{ uri: item.image }} style={styles.foodImage} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.likes}>❤️ {item.likes} likes</Text>
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 30,
            paddingVertical:10,
          }}>
          Menu
        </Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    paddingVertical:10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  foodImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  likes: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: 8,
  }
});

export default FoodListScreen;
