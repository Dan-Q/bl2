# BodLanes 2

Static web-powered digital signage/interactive kiosk creation framework. Experimental technology;
use in production at your own risk.

### Prerequisites

You will need Node (and NPM).

## Getting Started

Download the project. Install the required modules:

```
npm install
```

Start a local server:

```
npm start
```

Visit http://localhost:8080/examples/example1 for some starting hints. View the source of these examples
and make your own presentations in the presentations folder (e.g. presentations/my-presentation/index.html).

Build a presentation for deployment with:

```
npm build
npm run compile presentations/my-presentation
```

Compiled presentations are suitable for use as static offline sites (e.g. in your favourite Andoird kiosk
browser), in NW.js, or on the web (for cutting-edge browsers only).

## Contributing

Feel free to fork. Pull requests will be considered on a case-by-case basis. Please remember to add examples
demonstrating new features, including HTML comments: not everybody who uses BodLanes is a web developer!

## Authors

* **[Dan Q](https://github.com/Dan-Q)** ([Bodleian Libraries](https://www.bodleian.ox.ac.uk/))

## License

This project is licensed under the GPL License version 3 - see the [LICENSE](LICENSE) file for details - with
the exception of the copy of fontawesome free edition embedded within it, which is licensed under the MIT
license.

## Acknowledgments

With thanks to Jenny Townshend, Liz McCarthy, Alice O'Leary, and Gabriel Ignat on the Bodleian Libaries Comms-Web
Team.
