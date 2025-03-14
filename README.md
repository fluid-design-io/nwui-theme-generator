# 🎨 NWUI Theme Generator

![Home Page](https://github.com/user-attachments/assets/b385eabb-cd5a-4ada-8aaf-5393b4002f5d)

> Because life's too short for boring color schemes! 🌈

## What's This?

Ever wished you could wave a magic wand and generate beautiful, platform-specific color themes for your NativeWind UI apps? Well, this is pretty much that, minus the wand! 🪄

![NWUI-demo-1](https://github.com/user-attachments/assets/95b37575-aa58-42ac-8898-70ae6abb3f3d)

![NWUI-demo-2](https://github.com/user-attachments/assets/44e670fc-e5b0-415e-b13c-335a9e7d4435)

![NWUI-demo-3](https://github.com/user-attachments/assets/402d2974-4744-429c-89cf-669bad6ebd1a)


## ✨ Features

- 🎯 **Platform-Specific Themes**: Generate colors that feel right at home on iOS, Android, or web
- 🔄 **Live Preview**: See your changes in real-time (because who likes surprises?)
- 🔗 **Sharable Themes**: Share your masterpiece with a simple URL (powered by Zustand's hash storage magic)
- ⚡️ **Keyboard Shortcuts**: Speed up your workflow with quick keys for theme switching, device previews, and more
- 📱 **Built for NativeWind**: Perfect for your React Native + Tailwind CSS projects
- 🌓 **Dark/Light Mode**: Because themes are like the moon - they have two sides
- 🎭 **Preview Components**: Test your theme on real UI components

## 🤓 For the Nerdy Details

The generator uses platform-specific color algorithms to ensure your themes feel native on each platform:

- 🍎 **iOS**: Follows Apple's Human Interface Guidelines color principles
- 🤖 **Android**: Material Design 3 inspired color generation
- 🌐 **Web**: Modern web-first color schemes

Each platform generator extends a base class and implements its own color generation logic. Check out `src/lib/color-generator/` if you want to peek under the hood!

## 🤝 Contributing

Got ideas? Found a bug? Want to make it even more awesome? Contributions are welcome!

1. Fork it
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

_P.S. If you're reading this far, you might be interested in starring the repo. Just saying! ⭐️_
