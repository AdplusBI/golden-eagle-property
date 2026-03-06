// Run this in MongoDB Compass or shell
const images = db.images.find({}).toArray();

images.forEach(image => {
  if (image.propertyId) {
    const imageUrl = `/api/images/${image.gridFsId}`;
    
    // Check if property already has this image
    const property = db.properties.findOne({ _id: image.propertyId });
    
    if (property) {
      const hasImage = property.images && property.images.includes(imageUrl);
      
      if (!hasImage) {
        db.properties.updateOne(
          { _id: image.propertyId },
          { $push: { images: imageUrl } }
        );
        print(`Added image ${imageUrl} to property ${image.propertyId}`);
      } else {
        print(`Property ${image.propertyId} already has image ${imageUrl}`);
      }
    }
  }
});

print('Done fixing property images!');