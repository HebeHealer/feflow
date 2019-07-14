import compose from './compose';
import osenv from 'osenv';
import path from 'path';

export default function applyPlugins(plugins: any) {
    return (ctx: any) => {
      if (!plugins.length) {
        return;
      }
      const chain = plugins.map((plugin: any) => {
        const home = path.join(osenv.home(), './.feflow');
        const pluginPath = path.join(home, 'node_modules', plugin);
        return require(pluginPath)(ctx);
      });

      return compose(...chain);
    }
}