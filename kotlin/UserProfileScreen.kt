import androidx.compose.animation.core.copy
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Info // For tooltips
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.core.graphics.values
import kotlin.text.forEach
import kotlin.text.lowercase
import kotlin.text.replaceFirstChar
import kotlin.text.titlecase

// Assume you have a UserProfileViewModel
// class UserProfileViewModel : ViewModel() {
//     private val _userProfile = mutableStateOf(UserProfile(id = "someUserId")) // Load actual data
//     val userProfile: State<UserProfile> = _userProfile
//
//     fun updateBasicProfile(newProfile: UserBasicProfile) { /* ... */ }
//     // ... other update functions
//     fun saveProfile() { /* ... save to DB/backend ... */ }
// }

@OptIn(androidx.compose.material3.ExperimentalMaterial3Api::class)
@androidx.compose.runtime.Composable
fun UserProfileScreen(
    // viewModel: UserProfileViewModel = viewModel() // Hilt or other DI
) {
    // val userProfile by viewModel.userProfile.collectAsState() // If using Flow
    // For simplicity, let's assume mutableState for now, replace with ViewModel later
    var userProfileState by androidx.compose.runtime.remember { androidx.compose.runtime.mutableStateOf(UserProfile(id = "tempUser")) } // Load initial data

    androidx.compose.material3.Scaffold(
        topBar = {
            androidx.compose.material3.TopAppBar(title = { androidx.compose.material3.Text("Your Profile") })
        },
        floatingActionButton = {
            androidx.compose.material3.ExtendedFloatingActionButton(
                onClick = { /* viewModel.saveProfile() */ },
                icon = { /* Icon for save */ },
                text = { androidx.compose.material3.Text("Save Profile") }
            )
        },
        floatingActionButtonPosition = androidx.compose.material3.FabPosition.Center
    ) { paddingValues ->
        androidx.compose.foundation.layout.Column(
            modifier = Modifier
                .padding(paddingValues)
                .padding(16.dp)
                .verticalScroll(rememberScrollState())
        ) {
            // Each section will be a collapsible accordion
            ProfileSection(title = "Basic Identity & Lifestyle") {
                BasicIdentityLifestyleForm(
                    profile = userProfileState.basicProfile,
                    onProfileChange = { updated ->
                        userProfileState = userProfileState.copy(basicProfile = updated)
                    }
                )
            }
            androidx.compose.foundation.layout.Spacer(modifier = Modifier.height(16.dp))

            ProfileSection(title = "Dietary Preferences") {
                DietaryPreferencesForm(
                    preferences = userProfileState.dietaryPreferences,
                    onPreferencesChange = { updated ->
                        userProfileState = userProfileState.copy(dietaryPreferences = updated)
                    }
                )
            }
            androidx.compose.foundation.layout.Spacer(modifier = Modifier.height(16.dp))

            ProfileSection(title = "Allergies & Intolerances") {
                AllergiesForm(
                    allergyInfo = userProfileState.allergyInfo,
                    onAllergyInfoChange = { updated ->
                        userProfileState = userProfileState.copy(allergyInfo = updated)
                    }
                )
            }
            androidx.compose.foundation.layout.Spacer(modifier = Modifier.height(16.dp))

            ProfileSection(title = "Health & Nutrition Goals") {
                HealthGoalsForm(
                    goals = userProfileState.healthGoals,
                    onGoalsChange = { updated ->
                        userProfileState = userProfileState.copy(healthGoals = updated)
                    }
                )
            }
            androidx.compose.foundation.layout.Spacer(modifier = Modifier.height(16.dp))

            ProfileSection(title = "Meal Planning Habits") {
                MealPlanningHabitsForm(
                    habits = userProfileState.mealPlanningHabits,
                    onHabitsChange = { updated ->
                        userProfileState = userProfileState.copy(mealPlanningHabits = updated)
                    }
                )
            }
            androidx.compose.foundation.layout.Spacer(modifier = Modifier.height(16.dp))

            ProfileSection(title = "Grocery Preferences") {
                GroceryPreferencesForm(
                    preferences = userProfileState.groceryPreferences,
                    onPreferencesChange = { updated ->
                        userProfileState = userProfileState.copy(groceryPreferences = updated)
                    }
                )
            }

            androidx.compose.foundation.layout.Spacer(modifier = Modifier.height(80.dp)) // Space for FAB
        }
    }
}

// Reusable Collapsible Section
@androidx.compose.runtime.Composable
fun ProfileSection(
    title: String,
    content: @androidx.compose.runtime.Composable androidx.compose.foundation.layout.ColumnScope.() -> Unit
) {
    var expanded by androidx.compose.runtime.remember { androidx.compose.runtime.mutableStateOf(true) } // Or manage globally if needed

    androidx.compose.material3.Card(onClick = { expanded = !expanded }) {
        androidx.compose.foundation.layout.Column(modifier = Modifier.padding(12.dp)) {
            androidx.compose.foundation.layout.Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = androidx.compose.foundation.layout.Arrangement.SpaceBetween,
                modifier = Modifier.fillMaxWidth()
            ) {
                androidx.compose.material3.Text(text = title, style = androidx.compose.material3.MaterialTheme.typography.titleMedium)
                // Icon(if (expanded) Icons.Filled.ExpandLess else Icons.Filled.ExpandMore, "Expand/Collapse")
            }
            if (expanded) {
                androidx.compose.foundation.layout.Spacer(modifier = Modifier.height(8.dp))
                androidx.compose.foundation.layout.Column(content = content)
            }
        }
    }
}

// --- Form Composables (Example for one section) ---
@OptIn(androidx.compose.material3.ExperimentalMaterial3Api::class)
@androidx.compose.runtime.Composable
fun BasicIdentityLifestyleForm(
    profile: UserBasicProfile,
    onProfileChange: (UserBasicProfile) -> Unit
) {
    androidx.compose.material3.OutlinedTextField(
        value = profile.fullName,
        onValueChange = { onProfileChange(profile.copy(fullName = it)) },
        label = { androidx.compose.material3.Text("Full Name") },
        modifier = Modifier.fillMaxWidth()
    )
    androidx.compose.foundation.layout.Spacer(modifier = Modifier.height(8.dp))

    // Age / Date of Birth (Use a DatePickerDialog)
    // Gender (Dropdown or Radio Group)
    // Country (Dropdown or AutoCompleteTextField)
    // Timezone (Dropdown)

    androidx.compose.material3.Text("Measurement System", style = androidx.compose.material3.MaterialTheme.typography.labelMedium)
    androidx.compose.foundation.layout.Row {
        MeasurementSystem.values().forEach { system ->
            androidx.compose.foundation.layout.Row(verticalAlignment = Alignment.CenterVertically) {
                androidx.compose.material3.RadioButton(
                    selected = profile.measurementSystem == system,
                    onClick = { onProfileChange(profile.copy(measurementSystem = system)) }
                )
                androidx.compose.material3.Text(system.name.lowercase().replaceFirstChar { it.titlecase() })
            }
        }
    }
    androidx.compose.foundation.layout.Spacer(modifier = Modifier.height(8.dp))

    // Activity Level (Dropdown or Segmented Buttons)
    androidx.compose.material3.ExposedDropdownMenuBox(
        expanded = false, // manage state
        onExpandedChange = { /* ... */ }
    ) {
        androidx.compose.material3.OutlinedTextField(
            // ...
            value = profile.activityLevel.name,
            onValueChange = {}, // Not directly editable
            label = { androidx.compose.material3.Text("Activity Level") },
            // trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expandedState) },
            readOnly = true,
            modifier = Modifier.menuAnchor() // Important for a11y
        )
        // ExposedDropdownMenu(...) { /* DropdownMenuItem for each ActivityLevel */ }
    }
}

// TODO: Implement similar Form Composables for:
// - DietaryPreferencesForm (using Chips for multi-select, TextFields for lists)
// - AllergiesForm (Checkboxes, TextField for custom, Toggle for severity)
// - HealthGoalsForm (Dropdowns, Sliders for macros, TextField for notes)
// - MealPlanningHabitsForm (Multi-select Chips, TimePickers, Dropdowns)
// - GroceryPreferencesForm (Textfields, Sliders, Toggles, Multi-select for days)

// Helper for tooltips/info icons
@androidx.compose.runtime.Composable
fun InfoTooltip(text: String) {
    var showDialog by androidx.compose.runtime.remember { androidx.compose.runtime.mutableStateOf(false) }
    androidx.compose.material3.IconButton(onClick = { showDialog = true }) {
        androidx.compose.material3.Icon(Icons.Filled.Info, contentDescription = "More info")
    }
    if (showDialog) {
        androidx.compose.material3.AlertDialog(
            onDismissRequest = { showDialog = false },
            title = { androidx.compose.material3.Text("Information") },
            text = { androidx.compose.material3.Text(text) },
            confirmButton = {
                androidx.compose.material3.TextButton(onClick = { showDialog = false }) { androidx.compose.material3.Text("OK") }
            }
        )
    }
}
