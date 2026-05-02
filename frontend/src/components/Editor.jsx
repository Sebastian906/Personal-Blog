import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    Autosave,
    Essentials,
    Paragraph,
    Autoformat,
    TextTransformation,
    LinkImage,
    Link,
    ImageBlock,
    ImageToolbar,
    BlockQuote,
    Bold,
    CloudServices,
    ImageUpload,
    ImageInsertViaUrl,
    AutoImage,
    TableColumnResize,
    Table,
    TableToolbar,
    Emoji,
    Mention,
    Heading,
    ImageTextAlternative,
    ImageCaption,
    ImageResize,
    ImageStyle,
    Indent,
    IndentBlock,
    ImageInline,
    Italic,
    ListProperties,
    List,
    MediaEmbed,
    PasteFromOffice,
    TableCaption,
    TableCellProperties,
    TableProperties,
    TodoList,
    Underline,
    FindAndReplace,
    SpecialCharactersArrows,
    SpecialCharacters,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    SimpleUploadAdapter,
    ImageInsert,
    PageBreak,
    ShowBlocks,
    GeneralHtmlSupport,
    HtmlEmbed,
    HtmlComment,
    FullPage,
    TextPartLanguage,
    WordCount,
    Title,
    BalloonToolbar,
    BlockToolbar
} from 'ckeditor5';
import { SourceEditingEnhanced, EmailConfigurationHelper } from 'ckeditor5-premium-features';

import translations from 'ckeditor5/translations/es.js';
import premiumFeaturesTranslations from 'ckeditor5-premium-features/translations/es.js';

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

// import './App.css';

const LICENSE_KEY =
    'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3Nzg5NzU5OTksImp0aSI6ImVkMjc0M2QyLTFiOWQtNGFhOC05NDhlLWQyNzFiYjdkYzI2OSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImIzZjE5N2M5In0.JIXq7AXPuipwS0h11yVLjqgZBWO1liU3cjQqjx5sXCZjele4BLpB8vYUxYYB9wG8ZaYEjlxL2iH4jfQRUrjI5g';

const DEFAULT_HEX_COLORS = [
    { color: '#000000', label: 'Black' },
    { color: '#4D4D4D', label: 'Dim grey' },
    { color: '#999999', label: 'Grey' },
    { color: '#E6E6E6', label: 'Light grey' },
    { color: '#FFFFFF', label: 'White', hasBorder: true },
    { color: '#E65C5C', label: 'Red' },
    { color: '#E69C5C', label: 'Orange' },
    { color: '#E6E65C', label: 'Yellow' },
    { color: '#C2E65C', label: 'Light green' },
    { color: '#5CE65C', label: 'Green' },
    { color: '#5CE6A6', label: 'Aquamarine' },
    { color: '#5CE6E6', label: 'Turquoise' },
    { color: '#5CA6E6', label: 'Light blue' },
    { color: '#5C5CE6', label: 'Blue' },
    { color: '#A65CE6', label: 'Purple' }
];

export default function Editor({ props }) {
    const editorWordCountRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    useEffect(() => {
        setIsLayoutReady(true);

        return () => setIsLayoutReady(false);
    }, []);

    const { editorConfig } = useMemo(() => {
        if (!isLayoutReady) {
            return {};
        }

        return {
            editorConfig: {
                root: {
                    placeholder: 'Type or paste your content here!',
                    initialData:
                        props?.initialData || '',
                },
                toolbar: {
                    items: [
                        'undo',
                        'redo',
                        '|',
                        'sourceEditingEnhanced',
                        'showBlocks',
                        'findAndReplace',
                        'textPartLanguage',
                        '|',
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'underline',
                        '|',
                        'emoji',
                        'specialCharacters',
                        'pageBreak',
                        'link',
                        'insertImage',
                        'mediaEmbed',
                        'insertTable',
                        'blockQuote',
                        'htmlEmbed',
                        '|',
                        'bulletedList',
                        'numberedList',
                        'todoList',
                        'outdent',
                        'indent'
                    ],
                    shouldNotGroupWhenFull: false
                },
                plugins: [
                    Autoformat,
                    AutoImage,
                    Autosave,
                    BalloonToolbar,
                    BlockQuote,
                    BlockToolbar,
                    Bold,
                    CloudServices,
                    EmailConfigurationHelper,
                    Emoji,
                    Essentials,
                    FindAndReplace,
                    FullPage,
                    GeneralHtmlSupport,
                    Heading,
                    HtmlComment,
                    HtmlEmbed,
                    ImageBlock,
                    ImageCaption,
                    ImageInline,
                    ImageInsert,
                    ImageInsertViaUrl,
                    ImageResize,
                    ImageStyle,
                    ImageTextAlternative,
                    ImageToolbar,
                    ImageUpload,
                    Indent,
                    IndentBlock,
                    Italic,
                    Link,
                    LinkImage,
                    List,
                    ListProperties,
                    MediaEmbed,
                    Mention,
                    PageBreak,
                    Paragraph,
                    PasteFromOffice,
                    ShowBlocks,
                    SimpleUploadAdapter,
                    SourceEditingEnhanced,
                    SpecialCharacters,
                    SpecialCharactersArrows,
                    SpecialCharactersCurrency,
                    SpecialCharactersEssentials,
                    SpecialCharactersLatin,
                    SpecialCharactersMathematical,
                    SpecialCharactersText,
                    Table,
                    TableCaption,
                    TableCellProperties,
                    TableColumnResize,
                    TableProperties,
                    TableToolbar,
                    TextPartLanguage,
                    TextTransformation,
                    Title,
                    TodoList,
                    Underline,
                    WordCount
                ],
                licenseKey: LICENSE_KEY,
                balloonToolbar: ['bold', 'italic', '|', 'link', 'insertImage', '|', 'bulletedList', 'numberedList'],
                blockToolbar: [
                    'bold',
                    'italic',
                    '|',
                    'link',
                    'insertImage',
                    'insertTable',
                    '|',
                    'bulletedList',
                    'numberedList',
                    'outdent',
                    'indent'
                ],
                heading: {
                    options: [
                        {
                            model: 'paragraph',
                            title: 'Paragraph',
                            class: 'ck-heading_paragraph'
                        },
                        {
                            model: 'heading1',
                            view: 'h1',
                            title: 'Heading 1',
                            class: 'ck-heading_heading1'
                        },
                        {
                            model: 'heading2',
                            view: 'h2',
                            title: 'Heading 2',
                            class: 'ck-heading_heading2'
                        },
                        {
                            model: 'heading3',
                            view: 'h3',
                            title: 'Heading 3',
                            class: 'ck-heading_heading3'
                        },
                        {
                            model: 'heading4',
                            view: 'h4',
                            title: 'Heading 4',
                            class: 'ck-heading_heading4'
                        },
                        {
                            model: 'heading5',
                            view: 'h5',
                            title: 'Heading 5',
                            class: 'ck-heading_heading5'
                        },
                        {
                            model: 'heading6',
                            view: 'h6',
                            title: 'Heading 6',
                            class: 'ck-heading_heading6'
                        }
                    ]
                },
                htmlSupport: {
                    allow: [
                        {
                            name: /^(div|table|tbody|tr|td|span|img|h1|h2|h3|p|a)$/,
                            styles: true,
                            attributes: true,
                            classes: true
                        }
                    ]
                },
                image: {
                    toolbar: [
                        'toggleImageCaption',
                        'imageTextAlternative',
                        '|',
                        'imageStyle:inline',
                        'imageStyle:wrapText',
                        'imageStyle:breakText',
                        '|',
                        'resizeImage'
                    ]
                },
                language: 'es',
                link: {
                    addTargetToExternalLinks: true,
                    defaultProtocol: 'https://',
                    decorators: {
                        toggleDownloadable: {
                            mode: 'manual',
                            label: 'Downloadable',
                            attributes: {
                                download: 'file'
                            }
                        }
                    }
                },
                list: {
                    properties: {
                        styles: true,
                        startIndex: true,
                        reversed: false
                    }
                },
                mention: {
                    feeds: [
                        {
                            marker: '@',
                            feed: [
                                /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
                            ]
                        }
                    ]
                },
                table: {
                    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties'],
                    tableProperties: {
                        borderColors: DEFAULT_HEX_COLORS,
                        backgroundColors: DEFAULT_HEX_COLORS
                    },
                    tableCellProperties: {
                        borderColors: DEFAULT_HEX_COLORS,
                        backgroundColors: DEFAULT_HEX_COLORS
                    }
                },
                translations: [translations, premiumFeaturesTranslations]
            }
        };
    }, [isLayoutReady]);

    useEffect(() => {
        if (editorConfig) {
            configUpdateAlert(editorConfig);
        }
    }, [editorConfig]);

    return (
        <div className="main-container">
            <div className="editor-container editor-container_classic-editor editor-container_include-block-toolbar editor-container_include-word-count">
                <div className="editor-container__editor">
                    {editorConfig && (
                        <CKEditor
                            onChange={props.onChange}
                            onReady={editor => {
                                const wordCount = editor.plugins.get('WordCount');
                                editorWordCountRef.current.appendChild(wordCount.wordCountContainer);
                            }}
                            onAfterDestroy={() => {
                                Array.from(editorWordCountRef.current.children).forEach(child => child.remove());
                            }}
                            editor={ClassicEditor}
                            config={editorConfig}
                        />
                    )}
                </div>
                <div className="editor_container__word-count" ref={editorWordCountRef}></div>
            </div>
        </div>
    );
}

/**
 * This function exists to remind you to update the config needed for premium features.
 * The function can be safely removed. Make sure to also remove call to this function when doing so.
 */
function configUpdateAlert(config) {
    if (configUpdateAlert.configUpdateAlertShown) {
        return;
    }

    const isModifiedByUser = (currentValue, forbiddenValue) => {
        if (currentValue === forbiddenValue) {
            return false;
        }

        if (currentValue === undefined) {
            return false;
        }

        return true;
    };

    const valuesToUpdate = [];

    configUpdateAlert.configUpdateAlertShown = true;

    if (!isModifiedByUser(config.licenseKey, '<YOUR_LICENSE_KEY>')) {
        valuesToUpdate.push('LICENSE_KEY');
    }

    if (valuesToUpdate.length) {
        window.alert(
            [
                'Please update the following values in your editor config',
                'to receive full access to Premium Features:',
                '',
                ...valuesToUpdate.map(value => ` - ${value}`)
            ].join('\n')
        );
    }
}
