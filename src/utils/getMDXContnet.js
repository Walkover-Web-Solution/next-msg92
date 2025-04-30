import { serialize } from 'next-mdx-remote/serialize';
import * as fs from 'fs';
import matter from 'gray-matter';
import yaml from 'js-yaml';

export default async function getMDXContent(mdxFilePath) {
    if (!mdxFilePath) return '';

    try {
        const fileContent = fs.readFileSync(`src/${mdxFilePath}`, 'utf8');
        const matterResult = matter(fileContent, {
            engines: {
                yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
            },
        });
        const content = matterResult?.content;
        return await serialize(content);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`File not found at ${mdxFilePath}. Please ensure the file path is correct.`);
        } else {
            console.error(`Error reading or processing MDX file at ${mdxFilePath}:`, error);
        }
        return '';
    }
}
