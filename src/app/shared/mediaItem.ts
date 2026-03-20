export interface MediaItem {
  title: string;
  thumbnail: {
    regular: string[];
  };
  year: number;
  category: 'Movie' | 'TV Series';
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
}
