
import data from "../../public/data.json"; 


const skills = data.map((item) => ({
  id: item.id.toString(), 
  title: item.title,
  photos: item.photos,
}));

export { skills };
