import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';

interface Photo {
  url: string;
  alt: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <Card
            key={index}
            className="cursor-pointer overflow-hidden"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="aspect-square relative">
              <img
                src={photo.url}
                alt={photo.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl">
          {selectedPhoto && (
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.alt}
              className="w-full h-auto"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
