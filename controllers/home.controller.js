export default function homeController(req, res) {
    res.render('home', {
        metaTitle: 'Stateful Authentication Example | Home'
    });
}
