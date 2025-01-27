import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid2,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import z from 'zod';

import JsonEditor from '@/linkgen/src/components/editor';
import { preFillFacebookPixel, preFillGoogleAnalytics4, preFillNtfyServer } from '@/linkgen/src/lib/pre-fill';
import { generateBslLink } from '@/linkgen/src/lib/utility';
import { generateMuiStyles } from '@/linkgen/src/styles/generator';
import type { GeneratorHandleAddParameterReturns, GeneratorHandleRemoveParameterIndex, GeneratorHandleRemoveParameterReturns } from '@/types/linkgen.d.ts';

/**
 * Generator.
 *
 * @constructor
 *
 * @since 1.0.0
 */
export default function Generator() {
  const schema = z.object({
    requestBody: z.string(),
    requestType: z.union([
      z.literal('GET'),
      z.literal('POST'),
    ]),
    url: z.string().url(),
    urlParameters: z.array(z.object({
      key: z.string().nonempty(),
      value: z.string().nonempty(),
    })),
  });

  const {
    control,
    formState,
    reset,
    watch,
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      requestBody: '',
      requestType: 'GET',
      url: '',
      urlParameters: [],
    } as z.infer<typeof schema>,
    resolver: zodResolver(schema),
  });
  const { append, fields, remove } = useFieldArray({
    control,
    name: 'urlParameters',
  });
  const [generatedLink, setGeneratedLink] = useState('');
  const watched = watch();

  useEffect(() => {
    if (formState.isValid) {
      const {
        requestBody,
        requestType,
        url,
        urlParameters,
      } = watched;

      try {
        const fullUrl = new URL(url);

        // Append query parameters.
        urlParameters.forEach((urlParameter) => {
          fullUrl.searchParams.append(urlParameter.key, urlParameter.value);
        });

        // For POST requests, add request body information.
        if (requestType === 'POST' && requestBody) {
          const encodedBody = JSON.stringify(JSON.parse(requestBody));
          fullUrl.searchParams.append('bsl_data', encodedBody);
        }

        setGeneratedLink(generateBslLink(requestType, fullUrl));
      } catch {
        setGeneratedLink('');
      }
    } else {
      setGeneratedLink('');
    }
  }, [
    formState.isValid,
    watched,
  ]);

  /**
   * Generator - Handle add parameter.
   *
   * @returns {GeneratorHandleAddParameterReturns}
   *
   * @since 1.0.0
   */
  const handleAddParameter = (): GeneratorHandleAddParameterReturns => {
    append({
      key: '',
      value: '',
    });
  };

  /**
   * Generator - Handle remove parameter.
   *
   * @param {GeneratorHandleRemoveParameterIndex} index - Index.
   *
   * @returns {GeneratorHandleRemoveParameterReturns}
   *
   * @since 1.0.0
   */
  const handleRemoveParameter = (index: GeneratorHandleRemoveParameterIndex): GeneratorHandleRemoveParameterReturns => {
    remove(index);
  };

  return (
    <Container sx={generateMuiStyles('container')}>
      <Grid2 container spacing={4}>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>Pre-Fill Form</Typography>
            <Button variant="contained" fullWidth onClick={() => reset(preFillFacebookPixel)}>Facebook Pixel</Button>
            <Button variant="contained" fullWidth onClick={() => reset(preFillGoogleAnalytics4)}>Google Analytics 4</Button>
            <Button variant="contained" fullWidth onClick={() => reset(preFillNtfyServer)}>ntfy Server</Button>
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 9 }}>
          <Box component="form" noValidate>
            <FormControl margin="normal" fullWidth>
              <Controller
                name="requestType"
                control={control}
                defaultValue="GET"
                render={({ field, fieldState }) => ((
                  <TextField
                    id={field.name}
                    name={field.name}
                    value={field.value}
                    inputRef={field.ref}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={fieldState.error !== undefined}
                    helperText={fieldState.error?.message}
                    label="Request Type"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    disabled={formState.isSubmitting}
                    aria-disabled={formState.isSubmitting}
                    required
                    select
                  >
                    <MenuItem key="GET" value="GET">GET</MenuItem>
                    <MenuItem key="POST" value="POST">POST</MenuItem>
                  </TextField>
                ))}
              />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <Controller
                name="url"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => ((
                  <TextField
                    id={field.name}
                    name={field.name}
                    value={field.value}
                    inputRef={field.ref}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={fieldState.error !== undefined}
                    helperText={(fieldState.error) ? fieldState.error.message : undefined}
                    label="Base URL"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    disabled={formState.isSubmitting}
                    aria-disabled={formState.isSubmitting}
                    required
                  />
                ))}
              />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              {
                fields.map((field, index) => (
                  <Stack key={field.id} direction="row" spacing={2} sx={generateMuiStyles('stack')}>
                    <Controller
                      name={`urlParameters.${index}.key`}
                      control={control}
                      defaultValue=""
                      render={({ field, fieldState }) => (
                        <TextField
                          id={field.name}
                          name={field.name}
                          value={field.value}
                          inputRef={field.ref}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          error={fieldState.error !== undefined}
                          helperText={(fieldState.error) ? fieldState.error.message : undefined}
                          label="Key"
                          slotProps={{
                            inputLabel: {
                              shrink: true,
                            },
                          }}
                          disabled={formState.isSubmitting}
                          aria-disabled={formState.isSubmitting}
                          required
                          fullWidth
                        />
                      )}
                    />
                    <Controller
                      name={`urlParameters.${index}.value`}
                      control={control}
                      defaultValue=""
                      render={({ field, fieldState }) => (
                        <TextField
                          id={field.name}
                          name={field.name}
                          value={field.value}
                          inputRef={field.ref}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          error={fieldState.error !== undefined}
                          helperText={(fieldState.error) ? fieldState.error.message : undefined}
                          label="Value"
                          slotProps={{
                            inputLabel: {
                              shrink: true,
                            },
                          }}
                          disabled={formState.isSubmitting}
                          aria-disabled={formState.isSubmitting}
                          required
                          fullWidth
                        />
                      )}
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveParameter(index)}
                      sx={generateMuiStyles('button-trash')}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </Stack>
                ))
              }
              <Button variant="outlined" color="primary" onClick={handleAddParameter}>Add Parameter</Button>
            </FormControl>
            {
              (watch('requestType') === 'POST') && (
                <>
                  <Typography variant="h6" sx={generateMuiStyles('title')}>Request Body (JSON)</Typography>
                  <FormControl margin="normal" fullWidth>
                    <Controller
                      name="requestBody"
                      control={control}
                      defaultValue=""
                      render={({ field }) => ((
                        <JsonEditor
                          onChange={field.onChange}
                          value={field.value}
                        />
                      ))}
                    />
                  </FormControl>
                </>
              )
            }
            <Typography variant="h6" sx={generateMuiStyles('title')}>Generated Link</Typography>
            <FormControl margin="normal" fullWidth>
              <Box sx={generateMuiStyles('link')}>
                {generatedLink}
              </Box>
            </FormControl>
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
}
