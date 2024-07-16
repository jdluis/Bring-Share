import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getAllCategories } from "@/lib/appwrite";

interface CategorySelectorProps {
  title: string;
  onSelectionChange: (selectedCategories: string[]) => void;
  otherStyles?: string;
}

const CategorySelector = ({
  title,
  onSelectionChange,
  otherStyles,
}: CategorySelectorProps) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
        setFilteredCategories([]);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const filterCategories = (term: string) => {
    if (term.trim() === "") {
      setFilteredCategories([]);
    } else {
      const lowerCaseTerm = term.toLowerCase();
      setFilteredCategories(
        categories.filter(
          (category: { name: string; subcategories: string[] }) =>
            category.name.toLowerCase().includes(lowerCaseTerm) ||
            category.subcategories.some((sub) =>
              sub.toLowerCase().includes(lowerCaseTerm)
            )
        )
      );
    }
  };

  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
    filterCategories(text);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((cat) => cat !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  useEffect(() => {
    onSelectionChange(selectedCategories);
  }, [selectedCategories]);

  if (loading) {
    return <ActivityIndicator size="large" color="#FFD700" />;
  }

  return (
    <View className={`my-2 ${otherStyles}`}>
      <Text className="text-base text-white mb-2">{title}</Text>

      <TextInput
        className="w-full h-10 px-2 bg-gray-800 text-white rounded-lg mb-2"
        value={searchTerm}
        placeholder="Search categories...(Food, Drinks, Consumables, Others..)"
        placeholderTextColor="#7b7b8b"
        onChangeText={handleSearchChange}
      />

      <FlatList
        data={filteredCategories}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View className="mb-2">
            <TouchableOpacity onPress={() => handleCategorySelect(item.name)}>
              <Text
                className={`text-white font-bold ${
                  selectedCategories.includes(item.name)
                    ? "text-yellow-400"
                    : ""
                }`}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        nestedScrollEnabled={true}
      />
    </View>
  );
};

export default CategorySelector;
