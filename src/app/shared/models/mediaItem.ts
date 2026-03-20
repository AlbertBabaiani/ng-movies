export interface MediaItem {
  id?: string;
  title: string;
  thumbnail: {
    regular: {
      small: string;
      medium?: string;
      large?: string;
    };
    trending?: {
      small: string;
      medium?: string;
      large?: string;
    };
  };
  year: number;
  category: 'Movie' | 'TV Series';
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
}
