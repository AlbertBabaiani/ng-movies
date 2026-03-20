export interface MediaItem {
  id?: string;
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
