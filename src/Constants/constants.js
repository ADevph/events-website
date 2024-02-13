
import data from "../../public/data.json"; // Adjust the path accordingly


const skills = data.map((item) => ({
  id: item.id.toString(), // Convert ID to string if needed
  title: item.title,
  photos: item.photos,
}));

export { skills };
